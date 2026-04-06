import React from "react";

export default function DashCards() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div>All Blogs</div>
            <div>Seach Blogs</div>
          </div>
          <div>Add Stories</div>
        </div>
        <div className="font-extralight">Overview</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-red-100">Users</div>
          <div className="bg-red-200">Blogs</div>
          <div className="bg-red-300">Stories</div>
        </div>
      </div>
    </>
  );
}
