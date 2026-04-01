export default function DescriptionStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap');
      .noto { font-family: 'Noto Sans Devanagari', sans-serif; }
      .lc2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
      .lc3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
      .article-html-body p { margin-bottom: 1rem; line-height: 2.1; }
      .article-html-body p:last-child { margin-bottom: 0; }
    `}</style>
  );
}
