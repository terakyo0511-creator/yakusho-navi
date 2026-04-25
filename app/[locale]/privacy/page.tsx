import Link from "next/link";

const content: Record<string, { title: string; body: string[] }> = {
  ja: {
    title: "プライバシーポリシー",
    body: [
      "当サイト（cityhall-guide.vercel.app）は、在日外国人向けの役所手続きガイドです。",
      "当サイトでは、Google AdSenseを使用しており、Googleがユーザーの興味に基づいた広告を表示するためにCookieを使用することがあります。Cookieを無効にする方法や、Google AdSenseに関する詳細はGoogleのプライバシーポリシーをご参照ください。",
      "Google Analytics等のアクセス解析ツールは現在使用していません。",
      "当サイトに掲載している情報は、できる限り正確な情報を提供するよう努めていますが、内容の正確性・最新性を保証するものではありません。手続きの詳細については、各官公庁の公式サイトをご確認ください。",
      "本ポリシーは予告なく変更することがあります。",
      "お問い合わせ先：tera.kyo0511@gmail.com",
    ],
  },
  en: {
    title: "Privacy Policy",
    body: [
      "This website (cityhall-guide.vercel.app) provides guidance on administrative procedures for foreign residents in Japan.",
      "This site uses Google AdSense, which may use cookies to display ads based on your interests. For more information on how to disable cookies or about Google AdSense, please refer to Google's Privacy Policy.",
      "We do not currently use Google Analytics or other access analysis tools.",
      "We strive to provide accurate information, but we do not guarantee the accuracy or timeliness of the content. Please refer to the official websites of the relevant government agencies for the latest procedures.",
      "This policy may be updated without notice.",
      "Contact: tera.kyo0511@gmail.com",
    ],
  },
  zh: {
    title: "隐私政策",
    body: [
      "本网站（cityhall-guide.vercel.app）为在日外国人提供行政手续指南。",
      "本网站使用 Google AdSense，Google 可能会使用 Cookie 根据您的兴趣展示广告。有关如何禁用 Cookie 或 Google AdSense 的详细信息，请参阅 Google 的隐私政策。",
      "目前不使用 Google Analytics 等访问分析工具。",
      "我们尽力提供准确的信息，但不保证内容的准确性或时效性。有关手续的详细信息，请参阅各官方网站。",
      "本政策可能在不事先通知的情况下更改。",
      "联系方式：tera.kyo0511@gmail.com",
    ],
  },
  vi: {
    title: "Chính sách bảo mật",
    body: [
      "Trang web này (cityhall-guide.vercel.app) cung cấp hướng dẫn thủ tục hành chính cho người nước ngoài tại Nhật Bản.",
      "Trang web sử dụng Google AdSense, Google có thể dùng Cookie để hiển thị quảng cáo dựa trên sở thích của bạn. Để biết thêm thông tin về cách tắt Cookie hoặc về Google AdSense, vui lòng tham khảo Chính sách quyền riêng tư của Google.",
      "Hiện tại chúng tôi không sử dụng Google Analytics hay các công cụ phân tích truy cập khác.",
      "Chúng tôi cố gắng cung cấp thông tin chính xác nhưng không đảm bảo tính chính xác hay cập nhật của nội dung. Vui lòng tham khảo trang web chính thức của các cơ quan nhà nước để biết thông tin mới nhất.",
      "Chính sách này có thể thay đổi mà không cần thông báo trước.",
      "Liên hệ: tera.kyo0511@gmail.com",
    ],
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale] ?? content.en;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link href={`/${locale}`} className="text-[#1a2744] hover:underline text-sm font-medium">
        ← Back
      </Link>
      <h1 className="text-2xl font-bold text-[#1a2744] mt-4 mb-6">{c.title}</h1>
      <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
        {c.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-8">Last updated: 2026-04-25</p>
    </div>
  );
}
