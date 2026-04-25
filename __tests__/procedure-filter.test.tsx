import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProcedureFilter, { type FilterableProcedure } from "@/components/ProcedureFilter";
import type { ProcedureLocationType } from "@/types/procedure";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const locationLabels: Record<ProcedureLocationType, string> = {
  city_hall: "City Hall",
  immigration_office: "Immigration Office",
  license_center: "License Center",
  bank: "Bank",
  phone_shop: "Phone Shop",
  tax_office: "Tax Office",
  hello_work: "Hello Work",
};

const labels = {
  search: "Keyword",
  category: "Category",
  location: "Location",
  withDeadlineOnly: "With deadlines only",
  all: "All",
  noResults: "No procedures match these filters.",
  minutes: "min",
  days: "days",
};

const categoryLabels = {
  arrival: "After Arrival",
  living: "Life Changes",
  departure: "Before Leaving Japan",
  visa: "Visa & License",
  support: "Life Support",
  family: "Family",
};

const procedures: FilterableProcedure[] = [
  {
    category: "arrival",
    procedure: {
      id: "moving_in",
      icon: "🏠",
      updated_at: "2026-04-26",
      deadline: { type: "within_days", days: 14, from: "after_moving" },
      location_type: "city_hall",
      cost_yen: 0,
      duration_minutes: { min: 30, max: 60 },
      translations: {
        ja: { title: "転入届", subtitle: "新しい住所への住民登録", required_documents: [], steps: [], warnings: [] },
        en: { title: "Moving-in Registration", subtitle: "Register your new address", required_documents: [], steps: [], warnings: [] },
        zh: { title: "转入登记", subtitle: "登记新地址", required_documents: [], steps: [], warnings: [] },
        vi: { title: "Đăng ký địa chỉ mới", subtitle: "Đăng ký địa chỉ", required_documents: [], steps: [], warnings: [] },
      },
      official_links: [],
    },
  },
  {
    category: "support",
    procedure: {
      id: "unemployment",
      icon: "🤝",
      updated_at: "2026-04-26",
      deadline: { type: "none" },
      location_type: "hello_work",
      cost_yen: 0,
      duration_minutes: { min: 45, max: 90 },
      translations: {
        ja: { title: "失業給付", subtitle: "雇用保険の申請", required_documents: [], steps: [], warnings: [] },
        en: { title: "Unemployment Benefits", subtitle: "Apply for employment insurance benefits", required_documents: [], steps: [], warnings: [] },
        zh: { title: "失业补助", subtitle: "雇用保险申请", required_documents: [], steps: [], warnings: [] },
        vi: { title: "Trợ cấp thất nghiệp", subtitle: "Xin bảo hiểm việc làm", required_documents: [], steps: [], warnings: [] },
      },
      official_links: [],
    },
  },
  {
    category: "family",
    procedure: {
      id: "marriage_registration",
      icon: "💍",
      updated_at: "2026-04-26",
      deadline: { type: "none" },
      location_type: "city_hall",
      cost_yen: 0,
      duration_minutes: { min: 30, max: 90 },
      translations: {
        ja: { title: "婚姻届", subtitle: "結婚の届出", required_documents: [], steps: [], warnings: [] },
        en: { title: "Marriage Registration", subtitle: "Register a legal marriage", required_documents: [], steps: [], warnings: [] },
        zh: { title: "婚姻登记", subtitle: "办理结婚届出", required_documents: [], steps: [], warnings: [] },
        vi: { title: "Đăng ký kết hôn", subtitle: "Nộp đăng ký kết hôn", required_documents: [], steps: [], warnings: [] },
      },
      official_links: [],
    },
  },
];

function renderFilter() {
  render(
    <ProcedureFilter
      procedures={procedures}
      categoryLabels={categoryLabels}
      locationLabels={locationLabels}
      labels={labels}
      locale="en"
    />,
  );
}

describe("ProcedureFilter", () => {
  it("filters by text", () => {
    renderFilter();

    fireEvent.change(screen.getByLabelText("Keyword"), { target: { value: "marriage" } });

    expect(screen.getByText("Marriage Registration")).toBeTruthy();
    expect(screen.queryByText("Moving-in Registration")).toBeNull();
  });

  it("filters by category", () => {
    renderFilter();

    fireEvent.change(screen.getByLabelText("Category"), { target: { value: "family" } });

    expect(screen.getByText("Marriage Registration")).toBeTruthy();
    expect(screen.queryByText("Unemployment Benefits")).toBeNull();
  });

  it("filters by location", () => {
    renderFilter();

    fireEvent.change(screen.getByLabelText("Location"), { target: { value: "hello_work" } });

    expect(screen.getByText("Unemployment Benefits")).toBeTruthy();
    expect(screen.queryByText("Moving-in Registration")).toBeNull();
  });

  it("filters by deadline", () => {
    renderFilter();

    fireEvent.click(screen.getByLabelText("With deadlines only"));

    expect(screen.getByText("Moving-in Registration")).toBeTruthy();
    expect(screen.queryByText("Marriage Registration")).toBeNull();
  });

  it("shows no results message", () => {
    renderFilter();

    fireEvent.change(screen.getByLabelText("Keyword"), { target: { value: "not found" } });

    expect(screen.getByText("No procedures match these filters.")).toBeTruthy();
  });
});
