import { PricingTable } from "@clerk/nextjs";
import Link from "next/link";
import {
  
  Sparkles,
 
} from "lucide-react";
import { TIER_DISPLAY_NAMES } from "@/lib/constants/subscription";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  searchParams: Promise<{
    required?: string;
    sessionId?: string;
  }>;
}

export default async function UpgradePage({ searchParams }: PageProps) {
  const { required, sessionId } = await searchParams;

  const requiredTierName = required
    ? TIER_DISPLAY_NAMES[required as keyof typeof TIER_DISPLAY_NAMES] ||
      required
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4 py-12 text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            3-day free trial on all plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {requiredTierName ? (
              <>
                Upgrade to{" "}
                <span className="text-primary">{requiredTierName}</span>
              </>
            ) : (
              <>
                Choose Your <span className="text-primary">Plan</span>
              </>
            )}
          </h1>
        
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        
      </main>
    </div>
  );
}