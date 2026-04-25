import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProcedureCard from "@/components/ProcedureCard";
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

const baseProps = {
  id: "moving_in",
  icon: "icon",
  title: "Moving-in Registration",
  subtitle: "Register your new address",
  costYen: 0,
  durationMin: 30,
  durationMax: 60,
  deadlineDays: 14,
  locationType: "city_hall" as const,
  locationLabels,
  locale: "en",
  minutesLabel: "min",
  daysLabel: "days",
};

describe("ProcedureCard", () => {
  it("renders the title", () => {
    render(<ProcedureCard {...baseProps} />);

    expect(screen.getByText("Moving-in Registration")).toBeTruthy();
  });

  it("renders zero cost as ¥0", () => {
    render(<ProcedureCard {...baseProps} />);

    expect(screen.getByText("¥0")).toBeTruthy();
  });

  it("renders the deadline badge when deadlineDays is provided", () => {
    render(<ProcedureCard {...baseProps} />);

    expect(screen.getByText("14 days")).toBeTruthy();
  });

  it("renders a location emoji with the translated location label", () => {
    render(<ProcedureCard {...baseProps} />);

    expect(screen.getByText("🏛️ City Hall")).toBeTruthy();
  });
});
