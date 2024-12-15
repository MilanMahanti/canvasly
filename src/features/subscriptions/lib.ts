import { subscriptions } from "@/db/schema";

const DAY_IN_MS = 86_400_000;

export const checkIsActive = (
  subscrition: typeof subscriptions.$inferSelect
) => {
  let active = false;
  if (subscrition && subscrition.priceId && subscrition.currentPeriodEnd) {
    active = subscrition.currentPeriodEnd.getTime() + DAY_IN_MS > Date.now();
  }
  return active;
};
