import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Testimonials } from "@/components/sections/Testimonials";
import type { Testimonial } from "@/lib/types";

const mock: Testimonial[] = [
  { quote: "First quote", name: "Alice", role: "PM" },
  { quote: "Second quote", name: "Bob", role: "EM" },
  { quote: "Third quote", name: "Carol", role: "Founder" },
];

// The dot indicators live OUTSIDE AnimatePresence, so their active state is a
// stable proxy for the current slide index (no exit-animation flakiness).
function activeDotIndex() {
  const dots = mock.map((_, i) =>
    screen.getByRole("button", { name: `Go to testimonial ${i + 1}` })
  );
  return dots.findIndex((d) => d.className.includes("w-7"));
}

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

describe("Testimonials — pausable autoplay (WCAG 2.2.2)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setReducedMotion(false);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("auto-advances to the next testimonial after the interval", () => {
    render(<Testimonials testimonials={mock} />);
    expect(activeDotIndex()).toBe(0);

    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(activeDotIndex()).toBe(1);
  });

  it("pauses auto-advance while the carousel is hovered", () => {
    render(<Testimonials testimonials={mock} />);
    const carousel = screen.getByRole("group", { name: "Testimonials" });

    fireEvent.mouseEnter(carousel);
    act(() => {
      vi.advanceTimersByTime(12000);
    });
    // Still on the first slide — hover paused the timer.
    expect(activeDotIndex()).toBe(0);

    // Leaving resumes autoplay.
    fireEvent.mouseLeave(carousel);
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(activeDotIndex()).toBe(1);
  });

  it("never auto-advances for prefers-reduced-motion users", () => {
    setReducedMotion(true);
    render(<Testimonials testimonials={mock} />);

    act(() => {
      vi.advanceTimersByTime(30000);
    });
    expect(activeDotIndex()).toBe(0);
  });
});
