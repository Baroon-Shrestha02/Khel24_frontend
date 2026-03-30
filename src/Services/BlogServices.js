import api from "./AxiosInstance";

export const fetchPublishedBlogs = () =>
  api.get("/blogs", { params: { status: "published" } });

export const fetchFeaturedBlog = () =>
  api.get("/featured", {
    params: { status: "published", limit: 1, sort: "-createdAt" },
  });

export const fetchSideBlogs = () =>
  api.get("/blogs", {
    params: { status: "published", limit: 3, sort: "-createdAt" },
  });

//pending - blog despription
export const fetchBlogById = (id) => api.get(`/blogs/${id}`);

export const fetchBlogsByCategory = (category) =>
  api.get("/blogs", { params: { status: "published", category } });

export const fetchFootballBlogs = () =>
  api.get("/blogs", { params: { status: "published", category: "Football" } });

export const fetchCricketBlogs = () =>
  api.get("/blogs", { params: { status: "published", category: "Cricket" } });

export const fetchOrgBlogs = () =>
  api.get("/blogs", { params: { status: "published", category: "O" } });

export const fetchOthersBlogs = () =>
  api.get("/blogs", { params: { status: "published", category: "Cricket" } });
