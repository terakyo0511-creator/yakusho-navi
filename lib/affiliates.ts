export interface AffiliateLink {
  name: string;
  url: string;
  note_ja: string;
  note_en: string;
  note_zh: string;
  note_vi: string;
}

export const affiliates: Record<string, AffiliateLink[]> = {
  bank_account: [],
  mobile_phone: [],
};
