"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function Testimonials() {
  return (
    <div className="py-10 flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={zaddyTestimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const zaddyTestimonials = [
  {
    quote:
      "Zaddy Forged Oil is the first product that actually feels like it was built for a man. It's non-greasy, absorbs instantly, and the scent is pure authority. My beard has never looked more disciplined.",
    name: "Marcus Thorne",
    title: "Executive Director",
  },
  {
    quote:
      "The Hydra+ Moisturizer is a game changer. I operate in high-stress environments where presentation is everything. This gives me that matte, clean finish without the hormone-disrupting junk in most brands.",
    name: "Julian Vane",
    title: "Venture Capitalist",
  },
  {
    quote:
      "Luxury isn't just about the price tag; it's about the precision. Zaddy's Ritual Cleanser is the baseline of my morning protocol. It strips the grime but keeps the edge. Essential for any man who values his skin.",
    name: "Dominic Blackwood",
    title: "Performance Coach",
  },
  {
    quote:
      "I've tried every high-end brand out there. Zaddy is the only one that understands masculine biology. The Immortality Serum has noticeably improved my skin's recovery after long flights and late nights.",
    name: "Adrian Sterling",
    title: "Tech Founder",
  },
  {
    quote: (
      <>
        "<span className="font-display italic text-gold">The B.D.E. briefs</span> are exactly what they claim to be. <span className="font-display italic text-gold">Bold, dominant, and effortless.</span> The fit is second-skin and the confidence boost is real. Zaddy is more than grooming; it's a standard."
      </>
    ),
    name: "Xavier Knight",
    title: "Professional Athlete",
  },
];
