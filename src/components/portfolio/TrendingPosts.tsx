import React from 'react';
import { Heart } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: '8 Upcoming Influencer Marketing Trends and Benefits',
    excerpt: "Marketing is evolving. It's changing from a one-way street to a two-way conversa...",
    likes: 260,
    comments: 234,
    shares: 123,
  },
  {
    id: 2,
    title: 'How Influencer Marketing Affects Consumer Buying Behavior',
    excerpt: 'As influencer marketing continues to grow, consumers have been turning to their...',
    likes: 260,
    comments: 234,
    shares: 123,
  },
];

const TrendingPosts: React.FC = () => {
  return (
    <div className="bg-white rounded-[16px] p-4 md:p-6">
      <h3 className="text-[18px] md:text-[20px] font-bold text-body-action mb-4">Trending Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-[#F1F1F1] rounded-[12px] p-4"
          >
            <h4 className="text-[16px] md:text-[18px] font-semibold text-body-action leading-snug mb-2">
              {post.title}
            </h4>
            <p className="text-[13px] md:text-[14px] text-[#818187] font-normal leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[14px] text-[#818187] bg-[#F6F6F6] rounded-[17px] px-2 py-1 font-medium">
                <Heart size={14} className="text-red-400 fill-red-400" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1.5 text-[14px] text-[#818187] bg-[#F6F6F6] rounded-[17px] px-2 py-1 font-medium">
                <img src="/assets/comment.svg" width={14} height={14} loading='lazy' alt="message" />
                {post.comments}
              </span>
              <span className="flex items-center gap-1.5 text-[14px] text-[#818187] bg-[#F6F6F6] rounded-[17px] px-2 py-1 font-medium">
                <img src="/assets/next.svg" width={14} height={14} loading='lazy' alt="share" />
                {post.shares}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;
