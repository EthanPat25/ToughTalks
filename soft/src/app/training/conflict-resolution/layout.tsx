
import { SidebarDemo } from "../../../components/Chat_Components/sidebar";
import React from "react"
import LoadingWrapper from "./LoadingWrapper"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <LoadingWrapper children = {
        <div>
            <SidebarDemo>{children}</SidebarDemo>
        </div>
    }/>
  );
}
