"use client";

import dynamic from "next/dynamic";

const ScrollScene = dynamic(() => import("./ScrollScene"), { ssr: false });

export default function ScrollSceneClient() {
  return <ScrollScene />;
}
