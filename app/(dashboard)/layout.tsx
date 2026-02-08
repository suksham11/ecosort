import Sidebar from "@/components/Sidebar";

export default function FeaturePagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
