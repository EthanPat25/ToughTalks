import { Navbar } from "@/components/NavBar";

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

