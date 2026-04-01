import { Medal } from "lucide-react";
import Tag from "./shared/Tag";
import SectionTitle from "./shared/SectionTitle";

const MAIN_NEWS = [
  {
    id: 2,
    tag: "फुटबल",
    tagColor: "bg-green-600",
    title: "बागमती प्रदेश फुटबल लिग: काठमाडौं एफसी च्याम्पियन",
    excerpt:
      "काठमाडौं एफसीले फाइनलमा मनाङ मार्स्याङ्दीलाई २-१ गोलले हराउँदै खिताब जित्यो।",
    author: "सन्तोष थापा",
    date: "१७ चैत २०८२",
    readTime: "३ मिनेट",
    borderColor: "border-t-green-600",
  },
  {
    id: 3,
    tag: "भलिबल",
    tagColor: "bg-amber-600",
    title: "अनिता माने — नेपालकी 'भलिबल क्वीन' जो विश्वमञ्चमा चम्किइन्",
    excerpt:
      "दाङकी अनिता मानेले दक्षिण एसियाली खेलकुदमा स्वर्ण पदक जितेर नेपाललाई गौरवान्वित तुल्याइन्।",
    author: "प्रिया श्रेष्ठ",
    date: "१६ चैत २०८२",
    readTime: "४ मिनेट",
    borderColor: "border-t-amber-600",
  },
  {
    id: 4,
    tag: "एथलेटिक्स",
    tagColor: "bg-violet-600",
    title: "गीता राना: पहाडकी छोरी जसले एसियाली धावनमा इतिहास रच्यो",
    excerpt:
      "मुस्ताङकी गीता रानाले एसियाली एथलेटिक्स च्याम्पियनसिपमा ५०००m दौडमा रजत पदक जिती।",
    author: "अमित गुरुङ",
    date: "१५ चैत २०८२",
    readTime: "४ मिनेट",
    borderColor: "border-t-violet-600",
  },
];

function NewsCardItem({ article }) {
  return (
    <div
      className={`bg-white rounded-xl overflow-hidden border border-slate-100 border-t-4 ${article.borderColor} shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer`}
    >
      <div className="p-4">
        <Tag label={article.tag} colorClass={article.tagColor} />
        <h3 className="font-bold text-[15px] text-slate-900 leading-snug mt-2 mb-2">
          {article.title}
        </h3>
        <p className="text-[13px] text-slate-500 leading-relaxed mb-3">
          {article.excerpt}
        </p>
        <div className="flex justify-between items-center border-t border-slate-100 pt-2.5">
          <span className="text-xs font-semibold text-slate-700">
            ✍️ {article.author}
          </span>
          <span className="text-[11px] text-slate-400">
            {article.date} · {article.readTime}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SpecialSportsNews({ articles = MAIN_NEWS }) {
  return (
    <div>
      <SectionTitle icon={Medal} label="विशेष समाचार" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((a) => (
          <NewsCardItem key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
