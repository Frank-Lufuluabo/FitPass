import { sanityFetch } from "@/sanity/lib/live";
import { startOfMonth, endOfMonth } from "date-fns";
import { MONTHLY_BOOKINGS_COUNT_QUERY } from "@/sanity/lib/queries/bookings";
import { auth } from "@clerk/nextjs/server";
import
    {
        type Tier,
        TIER_HIERARCHY,
        TIER_LIMITS,
        TIER_PRICING,
    } from "@/lib/constants/subscription";

// Re-export type and pricing for backwards compatibility
export type { Tier };
export { TIER_PRICING };

/**
 * Get user's current tier using Clerk Billing has() method
 * Checks plans in order from highest to lowest tier
 */
export async function getUserTier(): Promise<Tier | null>
{
    try
    {
        const { has } = await auth();

        // Check plans from highest tier to lowest
        // This ensures we return the highest tier the user has
        if (has({ plan: "champion" }))
        {
            return "champion";
        }
        if (has({ plan: "performance" }))
        {
            return "performance";
        }
        if (has({ plan: "basic" }))
        {
            return "basic";
        }

        return null;
    } catch (error)
    {
        console.error("Error getting user tier:", error);
        return null;
    }
}

/**
 * Get user tier info for client components (returns serializable data)
 */
export async function getUserTierInfo(): Promise<{
    tier: Tier | null;
    userId: string | null;
}>
{
    try
    {
        const { userId, has } = await auth();

        // Check plans from highest tier to lowest
        let tier: Tier | null = null;
        if (has({ plan: "champion" }))
        {
            tier = "champion";
        } else if (has({ plan: "performance" }))
        {
            tier = "performance";
        } else if (has({ plan: "basic" }))
        {
            tier = "basic";
        }

        return { tier, userId };
    } catch
    {
        return { tier: null, userId: null };
    }
}

/**
 * Check if user can access a specific tier class using Clerk Billing
 * Higher tiers can access all lower tier classes
 */
export async function canAccessClassTier(requiredTier: Tier): Promise<boolean>
{
    try
    {
        const { has } = await auth();

        // Check if user has access based on tier hierarchy
        // Champion can access all, Performance can access performance + basic, etc.
        switch (requiredTier)
        {
            case "basic":
                return (
                    has({ plan: "basic" }) ||
                    has({ plan: "performance" }) ||
                    has({ plan: "champion" })
                );
            case "performance":
                return has({ plan: "performance" }) || has({ plan: "champion" });
            case "champion":
                return has({ plan: "champion" });
            default:
                return false;
        }
    } catch
    {
        return false;
    }
}

/**
 * Check if user tier can access activity tier (sync version for when tier is already known)
 * Higher tiers can access all lower tier classes
 */
export function canAccessClass(userTier: Tier, activityTier: Tier): boolean
{
    return TIER_HIERARCHY[userTier] >= TIER_HIERARCHY[activityTier];
}

/**
 * Get monthly limit for tier
 */
export function getMonthlyLimit(tier: Tier): number
{
    return TIER_LIMITS[tier];
}

/**
 * Check if tier has unlimited access
 */
export function isUnlimited(tier: Tier): boolean
{
    return TIER_LIMITS[tier] === Infinity;
}
