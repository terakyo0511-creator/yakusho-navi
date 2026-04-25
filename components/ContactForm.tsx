"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactForm() {
  const t = useTranslations("contact");
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
    return <p className="text-green-700 text-sm bg-green-50 rounded-lg p-4">{t("success")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="access_key" value="e09f871b-c6d0-413f-92ac-3a698ea869f4" />
      <input type="hidden" name="subject" value="役所ナビ お問い合わせ" />
      <input type="checkbox" name="botcheck" className="hidden" />

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">{t("name")}</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744]"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">{t("message")}</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744] resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-[#1a2744] text-white px-6 py-3 rounded-lg text-sm font-medium hover:opacity-80 disabled:opacity-50"
      >
        {status === "sending" ? "..." : t("submit")}
      </button>
    </form>
  );
}
