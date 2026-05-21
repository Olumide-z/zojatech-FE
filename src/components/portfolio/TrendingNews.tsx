import React from 'react';

interface NewsItem {
  title: string;
  excerpt: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    title: 'Russia & Ukraine War',
    excerpt: "Marketing is evolving. It's chang...",
    image: '/assets/russia.png'
  },
  {
    title: 'Elon Musk bought Twitter',
    excerpt: 'Twitter is the most useful social pl...',
    image: '/assets/elon.png'
  },
  {
    title: 'Fuel Crisis Everywhere',
    excerpt: 'Due to covid situation in 2020 the...',
    image: '/assets/fuel.png'
  }
];

const TrendingNews: React.FC = () => {
  return (
    <div className="bg-white rounded-[16px] p-4 md:p-6">
      <h3 className="text-[18px] md:text-[20px] font-bold text-body-action mb-4">Trending News</h3>

      <div className="flex flex-col gap-3.5">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 bg-white border border-[#F1F1F1] rounded-xl hover:border-primary/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-200 cursor-pointer"
          >
            {/* Thumbnail */}
            <img
              src={item.image}
              alt={item.title}
              className="w-12 h-12 rounded-lg object-cover shrink-0 select-none"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[14px] font-bold text-body-action truncate leading-snug">
                {item.title}
              </h4>
              <p className="text-[12px] text-[#818187] truncate mt-0.5">
                {item.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
