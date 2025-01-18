"use client"

import { Navbar } from "@/components/ui/NavBar";
import React from "react";
import Loading from "../training/loadingAnimation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isComponentMounted, updateIsComponentMounted] = React.useState(false);
  
  React.useEffect(() => {
    updateIsComponentMounted(true);
  },[])

  return ( 
    isComponentMounted ? (
      <div>
        <Navbar></Navbar>
        {children}
      </div>
    ) : (
      <Loading></Loading>
    )
  );
}


