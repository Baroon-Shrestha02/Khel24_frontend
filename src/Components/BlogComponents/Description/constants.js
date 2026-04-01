import { FaFacebook } from "react-icons/fa";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";

export const socialBtns = [
  { icon: FaFacebook, cls: "bg-blue-600 hover:bg-blue-700", label: "Facebook" },
  { icon: BsTwitterX, cls: "bg-gray-900 hover:bg-black", label: "X" },
  { icon: BsLinkedin, cls: "bg-blue-700 hover:bg-blue-800", label: "LinkedIn" },
  {
    icon: RiShareForwardFill,
    cls: "bg-green-500 hover:bg-green-600",
    label: "Share",
  },
];

const CATEGORY_TAG_BG = {
  cricket: "bg-yellow-600",
  football: "bg-green-600",
  volleyball: "bg-teal-500",
  others: "bg-slate-600",
  org: "bg-blue-700",
  economy: "bg-green-600",
  tech: "bg-purple-600",
  health: "bg-orange-400",
  nba: "bg-red-500",
  politics: "bg-red-600",
};

export function categoryTagBg(category) {
  if (!category) return "bg-slate-600";
  const key = String(category).toLowerCase().replace(/\s+/g, "");
  return CATEGORY_TAG_BG[key] ?? "bg-slate-600";
}
