import Link from "next/link";
import ContactForm from "@/components/ContactForm";

const content: Record<string, { title: string; body: string }> = {
  ja: { title: "お問い合わせ", body: "ご質問・掲載情報の誤りのご報告・その他お問い合わせはこちらからどうぞ。" },
  en: { title: "Contact", body: "For questions, corrections, or other inquiries, please use the form below." },
  zh: { title: "联系我们", body: "如有疑问、信息更正请求或其他咨询，请使用以下表单。" },
  vi: { title: "Liên hệ", body: "Nếu có câu hỏi, báo cáo thông tin sai hoặc các yêu cầu khác, vui lòng dùng biểu mẫu bên dưới." },
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
      <h1 className="text-2xl font-bold text-[#1a2744] mt-4 mb-2">{c.title}</h1>
      <p className="text-gray-600 text-sm mb-6">{c.body}</p>
      <ContactForm locale={locale} />
    </div>
  );
}
