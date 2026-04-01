import { Link } from "react-router-dom";
import Tag from "./shared/Tag";
import { blogDetailPath } from "../../../Utils/blogPaths";

export default function FeaturedCard({ article }) {
  const imageUrl = article?.heroImage?.url;
  const to = blogDetailPath(article);

  const inner = (
    <div
      className="relative rounded-xl overflow-hidden min-h-[450px] flex flex-col justify-end cursor-pointer bg-slate-900"
      style={{
        backgroundImage: imageUrl
          ? `linear-gradient(
              to top,
              rgba(0,0,0,0.85) 0%,
              rgba(0,0,0,0.45) 45%,
              rgba(0,0,0,0.2) 100%
            ), url(${imageUrl})`
          : `linear-gradient(
              to bottom right,
              #1a1a2e,
              #16213e,
              #0f3460
            )`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 to-orange-400" />

      <div className="relative p-7 z-10">
        <Tag label={article?.category} />

        <h2 className="font-extrabold text-2xl md:text-3xl text-white leading-snug mt-3 mb-3">
          {article?.title}
        </h2>

        <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-5 max-w-2xl">
          {article?.summary}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex gap-3 text-slate-300 text-xs">
            <span>
              📅{" "}
              {article?.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString("ne-NP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block no-underline text-inherit">
        {inner}
      </Link>
    );
  }

  return inner;
}
