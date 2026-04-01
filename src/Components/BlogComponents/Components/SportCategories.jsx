import { Trophy } from "lucide-react";
import SectionTitle from "./shared/SectionTitle";
import { getCategories } from "../../../Services/BlogServices";
import { useEffect, useState } from "react";

const categoryIcons = {
  Cricket: "🏏",
  Football: "⚽",
  Volleyball: "🏐",
  International: "🌏",
  Others: "🎯",
};

const nepaliNames = {
  Cricket: "क्रिकेट",
  Football: "फुटबल",
  Volleyball: "भलिबल",
  Others: "अन्य",
};

export default function SportCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <SectionTitle icon={Trophy} label="खेलकुद विशेष" />

      {loading ? (
        <p className="text-sm text-slate-500">लोड हुँदैछ...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-red-50 hover:bg-red-100 rounded-xl py-4 px-2 text-center cursor-pointer transition-colors"
            >
              <div className="text-2xl mb-1">
                {categoryIcons[cat.category] || "🏅"}
              </div>

              <p className="font-bold text-[13px] text-slate-900">
                {nepaliNames[cat.category] || cat.category}
              </p>

              <p className="text-[11px] text-red-600 font-semibold">
                {cat.count}+
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
