
import { SidebarDemo } from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <SidebarDemo>
        {children}
        </SidebarDemo>
    </div>
  );
}