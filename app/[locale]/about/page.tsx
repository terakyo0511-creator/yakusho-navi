import Link from "next/link";

const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  ja: {
    title: "このサイトについて",
    sections: [
      {
        heading: "サービス概要",
        body: "役所手続きナビは、日本に住む外国人が役所でのさまざまな手続きをスムーズに行えるよう、必要書類・手順・注意事項を4言語（日本語・英語・中国語・ベトナム語）でわかりやすく解説するガイドサイトです。",
      },
      {
        heading: "運営者",
        body: "個人運営。お問い合わせは contact ページよりどうぞ。",
      },
      {
        heading: "免責事項",
        body: "掲載情報は公式機関の情報をもとに作成していますが、法改正等により変更になることがあります。最新情報は各官公庁の公式サイトでご確認ください。当サイトの情報を利用したことによるいかなる損害についても責任を負いかねます。",
      },
    ],
  },
  en: {
    title: "About This Site",
    sections: [
      {
        heading: "About",
        body: "Japan City Hall Guide helps foreign residents navigate administrative procedures in Japan. We provide step-by-step instructions for residence card renewal, health insurance, moving-in registration, and more — in English, Japanese, Chinese, and Vietnamese.",
      },
      {
        heading: "Operator",
        body: "Independently operated. For inquiries, please use the contact page.",
      },
      {
        heading: "Disclaimer",
        body: "Information is based on official sources but may change due to legal revisions. Always verify with the relevant government agency's official website. We are not responsible for any damage resulting from use of this site's information.",
      },
    ],
  },
  zh: {
    title: "关于本网站",
    sections: [
      {
        heading: "服务简介",
        body: "日本市政厅手续指南帮助在日外国人顺利办理各类行政手续。我们以日语、英语、中文、越南语提供所需材料、步骤及注意事项的详细说明。",
      },
      {
        heading: "运营者",
        body: "个人运营。如有疑问，请通过联系页面与我们联系。",
      },
      {
        heading: "免责声明",
        body: "信息基于官方来源，但可能因法律修订而变更。请以各官方网站的最新信息为准。对于因使用本站信息而造成的任何损失，本站不承担责任。",
      },
    ],
  },
  vi: {
    title: "Về trang web này",
    sections: [
      {
        heading: "Giới thiệu",
        body: "Japan City Hall Guide giúp người nước ngoài tại Nhật Bản thực hiện các thủ tục hành chính một cách thuận lợi. Chúng tôi cung cấp hướng dẫn từng bước bằng tiếng Nhật, tiếng Anh, tiếng Trung và tiếng Việt.",
      },
      {
        heading: "Người vận hành",
        body: "Vận hành cá nhân. Để liên hệ, vui lòng sử dụng trang liên hệ.",
      },
      {
        heading: "Tuyên bố miễn trách nhiệm",
        body: "Thông tin dựa trên nguồn chính thức nhưng có thể thay đổi do sửa đổi pháp luật. Luôn xác minh với trang web chính thức của cơ quan chính phủ liên quan. Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng thông tin trên trang này.",
      },
    ],
  },
};

export default async function AboutPage({
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
      <div className="space-y-6">
        {c.sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-base font-bold text-[#1a2744] mb-2">{section.heading}</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
