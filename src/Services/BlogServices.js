import api from "./AxiosInstance";

export const fetchPublishedBlogs = () =>
  api.get("/blogs", { params: { status: "published" } });

export const fetchRecentPublishedBlogs = (limit = 12) =>
  api.get("/blogs", {
    params: { status: "published", limit, sort: "-createdAt" },
  });

export const fetchFeaturedBlog = () =>
  api.get("/featured", {
    params: { status: "published", limit: 1, sort: "-createdAt" },
  });

export const fetchSideBlogs = () =>
  api.get("/blogs", {
    params: { status: "published", limit: 3, sort: "-createdAt" },
  });

export const getCategories = () =>
  api.get("/categories", {
    params: { status: "published" },
  });
//pending - blog despription
export const fetchBlogById = (id) => api.get(`/blogs/${id}`);

export const fetchBlogsByCategory = (category) =>
  api.get("/blogs", { params: { status: "published", category } });

export const fetchFootballBlogs = () =>
  api.get("/blogs", { params: { status: "published", category: "Football" } });

export const fetchCricketBlogs = () =>
  api.get("/blogs", { params: { status: "published", category: "Cricket" } });

export const fetchVolleyballBlogs = () =>
  api.get("/blogs", {
    params: { status: "published", category: "Volleyball" },
  });

export const fetchOthersBlogs = () =>
  api.get("/blogs", { params: { status: "published", category: "Others" } });
