import { Zap } from "lucide-react";

const TICKER_NEWS = [
  "नेपाल क्रिकेट टोलीले एसिया कपमा ऐतिहासिक जित हासिल गर्‍यो",
  "रोहित पौडेलले शतक ठोके, नेपाल फाइनलमा",
  "अनिता माने दक्षिण एसियाली खेलकुदमा स्वर्ण पदक जिती",
  "नेपाल राष्ट्रिय फुटबल टिमको नयाँ प्रशिक्षक घोषणा",
  "पोखरा स्टेडियम नवीकरण कार्य सम्पन्न, अन्तर्राष्ट्रिय खेल आयोजना हुने",
];

export default function Ticker({ items = TICKER_NEWS }) {
  return (
    <div className="bg-red-600 text-white flex items-center h-9 overflow-hidden">
      <div className="bg-red-800 px-4 h-full flex items-center text-[13px] font-bold shrink-0 gap-1.5">
        <Zap size={13} className="text-yellow-300" />
        ताजा खबर
      </div>
      <div className="overflow-hidden flex-1">
        <div className="inline-block whitespace-nowrap animate-[ticker_38s_linear_infinite]">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="text-[13px] mr-16">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
