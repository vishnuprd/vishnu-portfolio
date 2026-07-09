import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Smoke test: proves the RTL + jsdom + Framer Motion setup renders a real
// component and its text content survives the SplitText/Reveal wrappers.
describe("SectionHeading", () => {
  it("renders the eyebrow and subtitle text", () => {
    render(
      <SectionHeading
        eyebrow="About"
        title="Engineering end-to-end"
        subtitle="Fast, secure and built to scale."
      />
    );
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Fast, secure and built to scale.")).toBeInTheDocument();
  });

  it("exposes the title as a heading", () => {
    render(<SectionHeading eyebrow="Work" title="Selected projects" />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
