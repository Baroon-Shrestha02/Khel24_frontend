import { categoryTagBg } from "./constants";

function authorDisplayName(author) {
  if (!author) return "संवाददाता";
  if (typeof author === "string") return author;
  return author.name || author.fullName || author.username || "संवाददाता";
}

function authorInitials(name) {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).slice(0, 2);
  }
  return name.slice(0, 2);
}

function splitSummary(summary) {
  if (!summary) return [];
  if (Array.isArray(summary)) return summary.filter(Boolean);
  const text = String(summary);
  const byBullet = text
    .split(/\n|•|·/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (byBullet.length > 1) return byBullet;
  return [text];
}

function bodyParagraphs(blog) {
  const raw = blog.content ?? blog.body ?? blog.description ?? blog.text ?? "";

  if (!raw) return [];

  const str = String(raw);
  if (/<[a-z][\s\S]*>/i.test(str)) {
    return [{ type: "html", html: str }];
  }

  return str
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => ({ type: "text", text: p }));
}

export function formatArticleTime(blog) {
  const d = blog.publishedAt || blog.createdAt;
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("ne-NP", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(d);
  }
}

export function formatShortTime(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("ne-NP", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function formatViewCount(n) {
  if (n == null || Number.isNaN(Number(n))) return "—";
  return Number(n).toLocaleString("ne-NP");
}

/** Normalize a single blog document from the API for the article layout */
export function mapBlogToArticle(blog) {
  if (!blog) return null;
  const authorName = authorDisplayName(blog.author);
  const body = bodyParagraphs(blog);

  return {
    id: blog._id ?? blog.id,
    title: blog.title ?? "",
    author: authorName,
    authorInitials: authorInitials(authorName),
    time: formatArticleTime(blog),
    shares: blog.shareCount ?? blog.shares ?? blog.views ?? 0,
    img: blog.heroImage?.url || blog.image || "/fallback.jpg",
    summary: splitSummary(blog.summary),
    body,
    quote: blog.pullQuote ?? blog.quote ?? "",
  };
}

/** Map list item for read-more / trending rows */
export function mapBlogToSidebarItem(blog) {
  if (!blog) return null;
  const views = blog.views ?? blog.viewCount;
  return {
    id: blog._id ?? blog.id,
    img: blog.heroImage?.url || blog.image || "/fallback.jpg",
    tag: blog.category ?? "समाचार",
    tagBg: categoryTagBg(blog.category),
    title: blog.title ?? "",
    time: formatShortTime(blog.publishedAt || blog.createdAt),
    views: formatViewCount(views),
  };
}

export function mapBlogToTrendingItem(blog, index) {
  const item = mapBlogToSidebarItem(blog);
  if (!item) return null;
  return {
    n: index + 1,
    title: item.title,
    tag: item.tag,
    v: item.views,
    blogId: item.id,
  };
}
