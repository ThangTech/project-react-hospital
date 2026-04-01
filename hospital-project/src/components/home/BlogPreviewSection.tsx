import { Link } from "react-router-dom";

type BlogPost = { id: number; category: string; title: string; excerpt: string; date: string; author: string };

const POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Sức khỏe",
    title: "Cách phòng ngừa bệnh cao huyết áp hiệu quả",
    excerpt: "Cao huyết áp là một trong những bệnh lý tim mạch phổ biến. Hiểu rõ nguyên nhân và cách phòng ngừa giúp bảo vệ sức khỏe lâu dài.",
    date: "28/03/2026",
    author: "BS. Nguyễn Văn An",
  },
  {
    id: 2,
    category: "Dinh dưỡng",
    title: "Chế độ ăn uống cho người bệnh tiểu đường",
    excerpt: "Dinh dưỡng hợp lý đóng vai trò then chốt trong kiểm soát đường huyết và ngăn ngừa biến chứng nghiêm trọng.",
    date: "24/03/2026",
    author: "BS. Trần Thị Bích",
  },
  {
    id: 3,
    category: "Y tế",
    title: "Tầm quan trọng của khám sức khỏe định kỳ",
    excerpt: "Khám định kỳ giúp phát hiện sớm bệnh lý tiềm ẩn, tăng hiệu quả điều trị và giảm chi phí y tế dài hạn.",
    date: "20/03/2026",
    author: "BS. Lê Minh Châu",
  },
];

const GRADIENT_MAP: Record<string, string> = {
  "Sức khỏe": "linear-gradient(135deg, #002f5c 0%, #005b96 100%)",
  "Dinh dưỡng": "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
  "Y tế": "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)",
};

const BlogPreviewSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <p className="text-[#005b96] text-xs font-semibold tracking-widest uppercase mb-3">Blog</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Tin Tức & Sức Khỏe</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Cập nhật các thông tin y tế hữu ích và lời khuyên sức khỏe từ đội ngũ chuyên gia của chúng tôi.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {POSTS.map((post) => (
          <article
            key={post.id}
            className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >
            <div
              className="h-44 flex items-end p-5"
              style={{ background: GRADIENT_MAP[post.category] ?? GRADIENT_MAP["Sức khỏe"] }}
            >
              <span className="inline-block bg-white text-[#005b96] text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-900 leading-snug mb-2">{post.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex justify-between text-xs text-gray-400 border-t border-gray-50 pt-4 mb-3">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <Link to={`/blog/${post.id}`} className="text-[#005b96] text-sm font-semibold hover:underline">
                Đọc thêm →
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          to="/blog"
          className="inline-block px-8 py-3 border-2 border-[#005b96] text-[#005b96] font-semibold rounded-xl hover:bg-[#005b96] hover:text-white transition-all duration-200"
        >
          Xem tất cả bài viết →
        </Link>
      </div>
    </div>
  </section>
);

export default BlogPreviewSection;
