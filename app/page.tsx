"use client";

import ArticleList from "./ArticleList";
import { useEffect, useState } from "react";
import { Article, Article_API_Response } from "./data/api";

type ArticleListUiOptions = {
  showRank: boolean;
  showBoard: boolean;
  showWriter: boolean;
  showHit: boolean;
  showTimeAgo: boolean;
};

// 옵션 리스트 정의
const option_list: { label: string; key: keyof ArticleListUiOptions }[] = [
  { label: "Show Rank", key: "showRank" },
  { label: "Show Board", key: "showBoard" },
  { label: "Show Writer", key: "showWriter" },
  { label: "Show Hit", key: "showHit" },
  { label: "Show Time Ago", key: "showTimeAgo" },
];

const Page = () => {
  const [options, setOptions] = useState<ArticleListUiOptions>({
    showRank: true,
    showBoard: true,
    showWriter: true,
    showHit: true,
    showTimeAgo: true,
  });

  // Implement Here! - Call API
  // use -> fetch("https://kwon.api.newbie.sparcs.net/")
  // use type Article_API_Response

  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    fetch("https://kwon.api.newbie.sparcs.net/")
      .then((response) => response.json())
      .then((data: Article_API_Response) => {
        setArticles(data.result);
      });
  }, []);


  const handleOptionChange = (option: keyof ArticleListUiOptions) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-6 pt-72 pb-20 text-black">
      <h1 className="text-xl font-bold">Options</h1>
      <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
        {option_list.map((option) => (
          <label
            key={option.key}
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap"
          >
            <input
              type="checkbox"
              className="h-3.5 w-3.5 accent-[#0a84d8]"
              checked={options[option.key]}
              onChange={() => handleOptionChange(option.key)}
            />
            {option.label}
          </label>
        ))}
      </div>
      {/* Implement Here! */}
      <ArticleList
        showRank={options.showRank}
        showBoard={options.showBoard}
        showWriter={options.showWriter}
        showHit={options.showHit}
        showTimeAgo={options.showTimeAgo}
        data={articles}
      />
    </main>
  );
};

export default Page;
