"use client";

import { Article } from "./data/api";
import Image from "next/image";

import commentIcon from "./assets/message-square.svg";
import goodIcon from "./assets/thumbs-up.svg";
import badIcon from "./assets/thumbs-down.svg";

// Note : 게시글 정보 가운데 점은 '·' 을 복붙해서 사용하세요. 특수문자 입니다.

/* fix this type with Article type */
type ArticleListProps = {
  showRank: boolean;
  showBoard: boolean;
  showWriter: boolean;
  showHit: boolean;
  showTimeAgo: boolean;
  data: Article[];
};

type SubInfo = {
  text: string;
  strong?: boolean;
};

const ArticleList = ({
  showRank = false,
  showBoard = false,
  showWriter = false,
  showHit = false,
  showTimeAgo = false,
  data = [],
}: ArticleListProps) => {
  return (
    <section className="mt-5 w-full max-w-150px border border-[#d9dfe6] bg-white px-9 py-1">
      {data.map((article) => {
        const sub = [
          showBoard && {
            text: article.board,
            strong: true
          },
          showWriter && {
            text: article.writter
          },
          showHit && {
            text: `조회 ${article.hit}`
          },
          showTimeAgo && {
            text: article.time_ago
          },
        ].filter(Boolean) as SubInfo[];

        return (
          <article
          key={article.rank}
          className="flex min-h-17px items-center gap-3 border-b border-transparent py-3 last:border-b-0"
        >
          {showRank && (
            <span className="w-4 shrink-0 text-center text-base font-semibold text-[#ed3a3a]">
              {article.rank}
            </span>
          )}


          <div className="min-w-0 flex-1">
            <p className={`truncate text-[15px] ${article.is_read ? "text-[#a0a0a0]" : "text-black"}`}>
              {article.title}</p>
            {sub.length > 0 && (
              <div className="flex gap-2 mt-1 text-xs text-[#a3a3a3]">
                {sub.map((info, idx) =>
                  <span key={idx}>
                    {idx > 0 && " · "}
                    <span className={info.strong ? "text-[#555555]" : "text-[#a3a3a3]"}>{info.text}
                    </span>
                  </span>
                )}
              </div>
            )} 
          </div>

          <div className="flex shrink-0 items-center gap-2 text-xs font-medium">
            <span className="flex items-center gap-1 text-[#5b9cde]">
              <Image src={badIcon} alt="Dislikes" /> {article.bad}
            </span>
            <span className="flex items-center gap-1 text-[#666666]">
              <Image src={commentIcon} alt="Comments" /> {article.comment}
            </span>
          </div>
        </article>
        );
      })}
    </section>
  );
};

export default ArticleList;
