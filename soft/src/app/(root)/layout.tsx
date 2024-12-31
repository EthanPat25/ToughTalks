"use client"

import { Navbar } from "@/components/ui/NavBar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (  
    <div>
      <Navbar></Navbar>
      {children}
    </div> 
  );
}


