"use client";

import dynamic from "next/dynamic";
import HeroSkeleton from "./HeroSkeleton";

const ScrollScene = dynamic(() => import("./ScrollScene"), {
  ssr: false,
  loading: () => <HeroSkeleton />,
});

export default function ScrollSceneClient() {
  return <ScrollScene />;
}
