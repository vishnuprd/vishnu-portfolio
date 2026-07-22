import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Projects } from "@/components/sections/Projects";
import type { Project } from "@/lib/types";

const mockProjects: Project[] = [
  {
    title: "Property Management SaaS",
    client: "ColiviQ · Germany",
    category: "PropTech · Multi-tenant SaaS",
    description: "A production property-management platform.",
    tech: ["React", "TypeScript", "Supabase"],
    features: ["RBAC", "Map view"],
    architecture: "React + Vite SPA → Supabase.",
    challenge: "Multi-tenant row-level security.",
    metrics: [{ label: "PRs merged", value: "470+" }],
    accent: "from-sky-500 to-blue-600",
  },
];

describe("Projects — keyboard accessibility", () => {
  it("exposes each project card as a keyboard-focusable button", () => {
    render(<Projects projects={mockProjects} />);
    const card = screen.getByRole("button", {
      name: /Property Management SaaS/i,
    });
    expect(card).toHaveAttribute("tabindex", "0");
    expect(card).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("opens the case-study dialog when Enter is pressed on a card", () => {
    render(<Projects projects={mockProjects} />);
    const card = screen.getByRole("button", {
      name: /Property Management SaaS/i,
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    card.focus();
    fireEvent.keyDown(card, { key: "Enter" });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("also opens the dialog with the Space key", () => {
    render(<Projects projects={mockProjects} />);
    const card = screen.getByRole("button", {
      name: /Property Management SaaS/i,
    });

    card.focus();
    fireEvent.keyDown(card, { key: " " });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
