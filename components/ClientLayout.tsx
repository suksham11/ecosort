"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pages that should have sidebar
  const dashboardPages = [
    "/dashboard",
    "/content",
    "/scanner",
    "/leaderboard",
    "/challenges",
    "/campaigns",
    "/analytics",
    "/collection",
    "/community",
    "/notifications",
  ];

  const shouldShowSidebar = dashboardPages.some((page) =>
    pathname?.startsWith(page)
  );

  if (shouldShowSidebar) {
    return <Sidebar>{children}</Sidebar>;
  }

  return <>{children}</>;
}
