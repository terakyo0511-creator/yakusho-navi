import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ChecklistProgress from "@/components/ChecklistProgress";

const labels = {
  progressLabel: "{done}/{total} done",
  allDoneLabel: "All done! Great job!",
};

describe("ChecklistProgress", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows zero progress when nothing is done", async () => {
    render(<ChecklistProgress procedureIds={["moving_in", "residence_card"]} labels={labels} />);

    await waitFor(() => {
      expect(screen.getByText(/0\/2 done/)).toBeTruthy();
    });
  });

  it("shows the all done message when every item is complete", async () => {
    localStorage.setItem("checklist_done_moving_in", "1");
    localStorage.setItem("checklist_done_residence_card", "1");

    render(<ChecklistProgress procedureIds={["moving_in", "residence_card"]} labels={labels} />);

    await waitFor(() => {
      expect(screen.getByText(/2\/2 done/)).toBeTruthy();
      expect(screen.getByText(/All done! Great job!/)).toBeTruthy();
    });
  });
});
