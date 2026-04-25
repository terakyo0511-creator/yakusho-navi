"use client";
import { useState } from "react";

const labels: Record<string, { name: string; message: string; submit: string; success: string; error: string }> = {
  ja: { name: "お名前", message: "メッセージ", submit: "送信する", success: "送信しました。ありがとうございます。", error: "送信に失敗しました。時間をおいてお試しください。" },
  en: { name: "Name", message: "Message", submit: "Send", success: "Message sent. Thank you!", error: "Failed to send. Please try again later." },
  zh: { name: "姓名", message: "留言内容", submit: "发送", success: "已发送，感谢您的联系。", error: "发送失败，请稍后重试。" },
  vi: { name: "Tên", message: "Nội dung", submit: "Gửi", success: "Đã gửi thành công. Cảm ơn bạn!", error: "Gửi thất bại. Vui lòng thử lại sau." },
};

export default function ContactForm({ locale }: { locale: string }) {
  const l = labels[locale] ?? labels.en;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return <p className="text-green-700 text-sm bg-green-50 rounded-lg p-4">{l.success}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="access_key" value="e09f871b-c6d0-413f-92ac-3a698ea869f4" />
      <input type="hidden" name="subject" value="役所ナビ お問い合わせ" />
      <input type="checkbox" name="botcheck" className="hidden" />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{l.name}</label>
        <input
          type="text"
          name="name"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{l.message}</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744] resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">{l.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-[#1a2744] text-white px-6 py-3 rounded-lg text-sm font-medium hover:opacity-80 disabled:opacity-50"
      >
        {status === "sending" ? "..." : l.submit}
      </button>
    </form>
  );
}
