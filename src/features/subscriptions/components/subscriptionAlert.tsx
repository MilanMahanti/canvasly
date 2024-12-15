"use client";

import React, { useEffect } from "react";
import { useFailModal } from "../store/useFailModal";
import { useSearchParams } from "next/navigation";
import { useSuccessModal } from "../store/useSuccessModal";

const SubscriptionAlert = () => {
  const params = useSearchParams();
  const { onOpen: onOpenFail } = useFailModal();
  const { onOpen: onOpenSuccess } = useSuccessModal();
  const cancelled = params.get("canceled");
  const success = params.get("success");

  useEffect(() => {
    if (cancelled) {
      onOpenFail();
    }
    if (success) {
      onOpenSuccess();
    }
  }, [cancelled, success, onOpenSuccess, onOpenFail]);

  return null;
};

export default SubscriptionAlert;
