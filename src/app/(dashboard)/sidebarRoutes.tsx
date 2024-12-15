"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react";
import React from "react";
import SidebarItem from "./sidebarItem";
import { usePathname } from "next/navigation";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";
import { useCheckout } from "@/features/subscriptions/api/useCheckout";
import { useBilling } from "@/features/subscriptions/api/useBilling";

const SidebarRoutes = () => {
  const { shouldBlock, triggerPaywall } = usePaywall();
  const checkoutMutation = useCheckout();
  const billingMutation = useBilling();
  const pathname = usePathname();
  const handelBilling = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }
    billingMutation.mutate();
  };
  return (
    <div className="flex flex-col gap-y-4 flex-1 mt-2">
      {shouldBlock && (
        <>
          <div className="px-3 mt-2">
            <Button
              className="w-full rounded-xl border-none bg-gradient-to-br from-[#01c3cc] via-[#445ce9] to-[#7d2ae7]  text-white transition"
              variant="secondary"
              onClick={() => checkoutMutation.mutate()}
              disabled={checkoutMutation.isPending}
            >
              <Crown className="mr-2 size-4 fill-yellow-400 text-yellow-400" />
              Upgrade to Premium
            </Button>
          </div>
          <div className="px-3">
            <Separator />
          </div>
        </>
      )}
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={Home}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href={pathname}
          icon={CreditCard}
          label="Billing"
          onClick={() => handelBilling()}
        />
        <SidebarItem
          href="mailto:milanmahanti16@gmail.com"
          icon={MessageCircleQuestion}
          label="Contact us"
        />
      </ul>
    </div>
  );
};

export default SidebarRoutes;
