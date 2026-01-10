import { AppHeader } from "@/components/app/layout/AppHeader";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
   <ClerkProvider>
    <AppHeader />
    {children}

  <SanityLive/>
  </ClerkProvider>
  );
}

export default AppLayout;