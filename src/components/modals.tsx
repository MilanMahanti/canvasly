"use client";

import FailModal from "@/features/subscriptions/components/failModal";
import SubscriptionModal from "@/features/subscriptions/components/subscriptionModal";
import SuccessModal from "@/features/subscriptions/components/successModal";
import React, { useEffect, useState } from "react";

const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SubscriptionModal />
      <FailModal />
      <SuccessModal />
    </>
  );
};

export default Modals;
