import IOpportunity from "./api/interfaces/IOpportunity";

export function getMaxOffer(
  offers?: { amount: number; status_cd: string }[]
): number {
  const filteredOffers =
    !offers || offers.length === 0
      ? []
      : offers.filter((offer) => offer.status_cd === "active");

  if (filteredOffers.length === 0) return 0;
  return filteredOffers.sort((a, b) => b.amount - a.amount)[0].amount;
}

export function generatePassword(len: number): string {
  const symbols = "abcdefghijklmnopqrstuvwxyz";
  const result: string[] = [];

  for (let n = 0; n < len; n++) result.push(symbols[Math.floor(Math.random() * symbols.length)]);

  return result.join("");
}

export function opportunityName(opportunity: IOpportunity) {
  const { year, make, model, trim } = opportunity.vehicle_id;
  return `${year} ${make} ${model} ${trim}`;
}

export function createSlug(opportunity: IOpportunity) {
  return [
    opportunity.vehicle_id.year,
    opportunity.vehicle_id.make,
    opportunity.vehicle_id.model,
    opportunity.vehicle_id.trim,
  ]
    .map((s) => `${s}`
        .split(" ")
        .map((s) => s.replace(/[^\w]+/gi, ""))
        .join("-"))
    .join("-");
}
