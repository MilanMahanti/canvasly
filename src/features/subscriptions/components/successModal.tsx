"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSuccessModal } from "../store/useSuccessModal";

const SuccessModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useSuccessModal();
  const handelClose = () => {
    router.replace("/");
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handelClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="logo" width={120} height={36} />
          <DialogTitle className="text-center">
            Subscription Successful
          </DialogTitle>
          <DialogDescription className="text-center">
            You have now unlocked all the premium features
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            className="w-full bg-[#445ce9] hover:bg-[#445ce9]/80"
            onClick={() => handelClose()}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
