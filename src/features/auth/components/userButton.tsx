"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBilling } from "@/features/subscriptions/api/useBilling";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";
import { CreditCard, Crown, Loader, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import React from "react";

const UserButton = () => {
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();
  const billingMutation = useBilling();
  const session = useSession();

  const handelBilling = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }
    billingMutation.mutate();
  };

  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data?.user?.name!;
  const avatar = session.data?.user?.image!;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        {!shouldBlock && !isLoading && (
          <div className="absolute -top-1 -left-1 z-10 flex items-center justify-center">
            <div className="rounded-full bg-white flex items-center justify-center p-1 drop-shadow-sm">
              <Crown className="size-3 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        )}
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt={name} src={avatar || ""} />
          <AvatarFallback className="bg-gradient-to-br from-[#01c3cc] via-[#445ce9] to-[#7d2ae7] font-medium text-white flex items-center justify-center">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem
          disabled={billingMutation.isPending}
          onClick={() => handelBilling()}
          className="h-10"
        >
          <CreditCard className="size-4 mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-10" onClick={() => signOut()}>
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
