import { Discount } from "./types";

export const sortOffers = (offers: Discount[]): Discount[] => {
  return offers.sort((a: Discount, b: Discount): number => {
    // Define the priority order of offer types
    const priorityOrder: { [key: string]: number } = {
      "% off": 1,
      "£ off": 2,
      Freebie: 3,
      Deal: 4,
    };

    // Compare offer types based on priority order
    const priorityA: number = priorityOrder[a.offer_type];
    const priorityB: number = priorityOrder[b.offer_type];

    // If offer types are different, sort based on their priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB; // Sort based on priority
    } else {
      // If offer types are the same, handle Deal sorting differently
      if (a.offer_type === "Deal") {
        // Parse the amount for comparison
        const amountA: number = parseFloat(a.amount.replace(/[^0-9.-]+/g, ""));
        const amountB: number = parseFloat(b.amount.replace(/[^0-9.-]+/g, ""));

        // Sort Deal offers from small to large
        return amountA - amountB;
      } else {
        // For other offer types, sort by amount from large to small
        const valueA: number = parseFloat(a.amount.replace(/[^0-9.-]+/g, ""));
        const valueB: number = parseFloat(b.amount.replace(/[^0-9.-]+/g, ""));
        return valueB - valueA;
      }
    }
  });
};
