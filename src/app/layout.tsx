import type { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "facebook-domain-verification": "co3zu915lv4y9u1fnz6ga9cimqg6cf",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
