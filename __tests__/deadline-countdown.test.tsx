import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DeadlineCountdown from "@/components/DeadlineCountdown";

const labels = {
  eventDateLabel: "Event date",
  remainingLabel: "{days} days remaining",
  overdueLabel: "{days} days overdue",
  clearLabel: "Clear",
  saveLabel: "Save",
};

function renderCountdown(procedureId = "moving_in") {
  render(
    <DeadlineCountdown
      procedureId={procedureId}
      deadlineDays={14}
      fromKey="moving"
      locale="en"
      labels={labels}
    />,
  );
}

describe("DeadlineCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2026, 3, 26, 12, 0, 0)));
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  it("calculates remaining days after saving a date", () => {
    renderCountdown();

    fireEvent.change(screen.getByLabelText("Event date"), { target: { value: "2026-04-20" } });
    fireEvent.click(screen.getByText("Save"));

    expect(screen.getByText("8 days remaining")).toBeTruthy();
    expect(localStorage.getItem("event_date_moving_in")).toBe("2026-04-20");
  });

  it("shows overdue days", () => {
    localStorage.setItem("event_date_moving_in", "2026-04-01");

    renderCountdown();

    expect(screen.getByText("11 days overdue")).toBeTruthy();
  });

  it("clears the saved date", () => {
    localStorage.setItem("event_date_tax_return", "2026-04-20");

    renderCountdown("tax_return");
    fireEvent.click(screen.getByText("Clear"));

    expect(localStorage.getItem("event_date_tax_return")).toBeNull();
    expect(screen.getByLabelText("Event date")).toBeTruthy();
  });
});
