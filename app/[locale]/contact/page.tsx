import Link from "next/link";

const content: Record<string, { title: string; body: string; email: string; note: string }> = {
  ja: {
    title: "お問い合わせ",
    body: "ご質問・掲載情報の誤りのご報告・その他お問い合わせは以下のメールアドレスまでご連絡ください。",
    email: "tera.kyo0511@gmail.com",
    note: "返信まで数日かかる場合があります。",
  },
  en: {
    title: "Contact",
    body: "For questions, corrections to information, or other inquiries, please contact us at the email address below.",
    email: "tera.kyo0511@gmail.com",
    note: "Please allow a few days for a response.",
  },
  zh: {
    title: "联系我们",
    body: "如有疑问、信息更正请求或其他咨询，请通过以下电子邮件地址与我们联系。",
    email: "tera.kyo0511@gmail.com",
    note: "回复可能需要数天时间。",
  },
  vi: {
    title: "Liên hệ",
    body: "Nếu có câu hỏi, báo cáo thông tin sai hoặc các yêu cầu khác, vui lòng liên hệ qua địa chỉ email bên dưới.",
    email: "tera.kyo0511@gmail.com",
    note: "Có thể mất vài ngày để phản hồi.",
  },
};

export default async function ContactPage({
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
      <p className="text-gray-700 text-sm leading-relaxed mb-4">{c.body}</p>
      <a
        href={`mailto:${c.email}`}
        className="inline-block bg-[#1a2744] text-white px-6 py-3 rounded-lg text-sm font-medium hover:opacity-80"
      >
        {c.email}
      </a>
      <p className="text-xs text-gray-400 mt-4">{c.note}</p>
    </div>
  );
}
