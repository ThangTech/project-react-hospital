import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/shared/PageHero";

type BlogPost = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
};

const CATEGORIES = ["Tất cả", "Sức khỏe", "Dinh dưỡng", "Y tế", "Phòng bệnh", "Chuyên khoa"];

const ALL_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Sức khỏe",
    title: "Cách phòng ngừa bệnh cao huyết áp hiệu quả",
    excerpt: "Cao huyết áp là một trong những bệnh lý tim mạch phổ biến nhất. Hiểu rõ nguyên nhân và cách phòng ngừa giúp bảo vệ sức khỏe lâu dài.",
    date: "28/03/2026",
    author: "BS. Nguyễn Văn An",
    readTime: "5 phút đọc",
  },
  {
    id: 2,
    category: "Dinh dưỡng",
    title: "Chế độ ăn uống cho người bệnh tiểu đường",
    excerpt: "Dinh dưỡng hợp lý đóng vai trò then chốt trong kiểm soát đường huyết và ngăn ngừa các biến chứng nghiêm trọng.",
    date: "24/03/2026",
    author: "BS. Trần Thị Bích",
    readTime: "7 phút đọc",
  },
  {
    id: 3,
    category: "Y tế",
    title: "Tầm quan trọng của khám sức khỏe định kỳ",
    excerpt: "Khám định kỳ giúp phát hiện sớm bệnh lý tiềm ẩn, tăng hiệu quả điều trị và giảm chi phí y tế dài hạn.",
    date: "20/03/2026",
    author: "BS. Lê Minh Châu",
    readTime: "4 phút đọc",
  },
  {
    id: 4,
    category: "Phòng bệnh",
    title: "Tiêm vắc xin — Lá chắn bảo vệ sức khỏe cộng đồng",
    excerpt: "Vắc xin là biện pháp phòng ngừa dịch bệnh hiệu quả và an toàn nhất. Cập nhật lịch tiêm chủng định kỳ cho bạn và gia đình.",
    date: "15/03/2026",
    author: "BS. Phạm Thu Dung",
    readTime: "6 phút đọc",
  },
  {
    id: 5,
    category: "Chuyên khoa",
    title: "Nhận biết sớm các dấu hiệu đột quỵ não",
    excerpt: "Đột quỵ não là tình trạng khẩn cấp y tế cần can thiệp sớm trong vài giờ đầu. Nhận biết triệu chứng có thể cứu sống tính mạng.",
    date: "10/03/2026",
    author: "BS. Nguyễn Văn An",
    readTime: "8 phút đọc",
  },
  {
    id: 6,
    category: "Sức khỏe",
    title: "Lợi ích của việc tập thể dục đều đặn mỗi ngày",
    excerpt: "Chỉ 30 phút vận động mỗi ngày có thể cải thiện đáng kể sức khỏe tim mạch, tâm lý và hệ miễn dịch của bạn.",
    date: "05/03/2026",
    author: "BS. Trần Thị Bích",
    readTime: "5 phút đọc",
  },
];

const GRADIENT_MAP: Record<string, string> = {
  "Sức khỏe": "linear-gradient(135deg, #002f5c 0%, #005b96 100%)",
  "Dinh dưỡng": "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
  "Y tế": "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)",
  "Phòng bệnh": "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
  "Chuyên khoa": "linear-gradient(135deg, #4a1d96 0%, #7c3aed 100%)",
};

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filtered =
    activeCategory === "Tất cả"
      ? ALL_POSTS
      : ALL_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div>
      <PageHero
        title="Blog & Tin Tức Sức Khỏe"
        subtitle="Thông tin y tế hữu ích, lời khuyên sức khỏe từ đội ngũ chuyên gia"
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-[#005b96] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20">Không có bài viết nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
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
                  <h2 className="font-bold text-gray-900 leading-snug mb-2">{post.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex justify-between text-xs text-gray-400 border-t border-gray-50 pt-4 mb-3">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-[#005b96] text-sm font-semibold hover:underline"
                    >
                      Đọc thêm →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
