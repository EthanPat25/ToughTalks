
import { SidebarDemo } from "../../components/Chat_Components/sidebar";

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