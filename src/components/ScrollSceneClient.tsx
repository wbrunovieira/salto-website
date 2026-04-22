"use client";

import dynamic from "next/dynamic";
import PageSkeleton from "./PageSkeleton";

const ScrollScene = dynamic(() => import("./ScrollScene"), {
  ssr: false,
  loading: () => <PageSkeleton />,
});

export default function ScrollSceneClient() {
  return <ScrollScene />;
}
