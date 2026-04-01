/** Path to blog detail route for an API document or raw id string */
export function blogDetailPath(blogOrId) {
  const id =
    typeof blogOrId === "object" && blogOrId !== null
      ? blogOrId._id ?? blogOrId.id
      : blogOrId;
  if (id == null || id === "") return null;
  return `/blog/${id}`;
}
