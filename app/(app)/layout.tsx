import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
   <ClerkProvider>
    {children}

  <SanityLive/>
  </ClerkProvider>
  );
}

export default AppLayout;