// Updated InfiniteMovingCardsDemo Component
// Replace the testimonials array with church stats and important points.
// Each "card" now shows a stat with an icon, value, and brief description for inspiration.

"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";


export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={churchStats}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const churchStats = [
  {
    quote: "Over 6,000 lives transformed through faith.",
    name: "✝️ Baptized Souls",
    title: "Salvation Ministry Impact",
  },
  {
    quote: "300 young hearts learning God's word every week.",
    name: "👨‍👩‍👧‍👦 Sunday School",
    title: "Nurturing the Next Generation",
  },
  {
    quote: "15+ home care groups launching this year for convenient fellowship.",
    name: "🏠 Community Connections",
    title: "Care Groups Expansion",
  },
  {
    quote: "Thousands united in prayer, with 40-day fasts three times a year.",
    name: "🙏 Prayer Warriors",
    title: "Spiritual Renewal",
  },
  {
    quote: "Harmonious praise from four dedicated choirs.",
    name: "🎤 Voices of Worship",
    title: "Choir Ministry",
  },
  {
    quote: "Welcoming hands through our usher teams.",
    name: "🚪 Serving with Joy",
    title: "Ushers & Hospitality",
  },
];