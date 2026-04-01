import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {
  fetchBlogById,
  fetchRecentPublishedBlogs,
} from "../../../Services/BlogServices";
import DescriptionStyles from "./DescriptionStyles";
import SocialRail from "./SocialRail";
import ArticleCard from "./ArticleCard";
import ReadMoreSection from "./ReadMoreSection";
import TrendingSidebar from "./TrendingSidebar";
import {
  mapBlogToArticle,
  mapBlogToSidebarItem,
  mapBlogToTrendingItem,
} from "./mapBlogFromApi";

function unwrapSingleBlog(res) {
  const raw = res?.data?.data ?? res?.data;
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    if (raw.blog) return raw.blog;
    return raw;
  }
  return null;
}

function unwrapBlogList(res) {
  const raw = res?.data?.data ?? res?.data;
  if (Array.isArray(raw)) return raw;
  if (raw?.blogs && Array.isArray(raw.blogs)) return raw.blogs;
  return [];
}

export default function BlogDescription() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedRaw, setRelatedRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!id) {
        setError("Missing blog id");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [blogRes, listRes] = await Promise.all([
          fetchBlogById(id),
          fetchRecentPublishedBlogs(12),
        ]);

        if (cancelled) return;

        const blog = unwrapSingleBlog(blogRes);
        const list = unwrapBlogList(listRes);

        setArticle(mapBlogToArticle(blog));
        setRelatedRaw(list);
      } catch (e) {
        if (!cancelled) {
          setError(e?.response?.data?.message || e.message || "Failed to load");
          setArticle(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const readMoreItems = useMemo(() => {
    return relatedRaw
      .filter((b) => {
        const bid = b._id ?? b.id;
        return bid && String(bid) !== String(id);
      })
      .slice(0, 6)
      .map(mapBlogToSidebarItem)
      .filter(Boolean);
  }, [relatedRaw, id]);

  const trendingItems = useMemo(() => {
    const sorted = [...relatedRaw].filter((b) => {
      const bid = b._id ?? b.id;
      return bid && String(bid) !== String(id);
    });

    sorted.sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0));

    return sorted
      .slice(0, 5)
      .map((b, i) => mapBlogToTrendingItem(b, i))
      .filter(Boolean);
  }, [relatedRaw, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 font-sans">
        <DescriptionStyles />
        <div className="noto container mx-auto px-3 py-4 max-w-4xl">
          <Skeleton height={420} className="rounded-2xl mb-4" />
          <Skeleton count={4} className="my-2" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-slate-100 font-sans flex items-center justify-center p-6">
        <DescriptionStyles />
        <p className="noto text-slate-600 text-center">
          {error || "समाचार फेला परेन।"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <DescriptionStyles />

      <div className="noto container mx-auto px-3 py-4 flex gap-3 items-start">
        <SocialRail
          liked={liked}
          saved={saved}
          onToggleLike={() => setLiked(!liked)}
          onToggleSave={() => setSaved(!saved)}
        />

        <main className="flex-1 min-w-0 flex flex-col gap-3">
          <ArticleCard
            article={article}
            liked={liked}
            saved={saved}
            onToggleLike={() => setLiked(!liked)}
            onToggleSave={() => setSaved(!saved)}
          />
          <ReadMoreSection items={readMoreItems} />
        </main>

        <TrendingSidebar items={trendingItems} />
      </div>
    </div>
  );
}
