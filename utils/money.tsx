import { IBalance } from "type/interface";

const formatter = (currency: string) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    currencyDisplay: "code",
  });

export const _handleGetOriginalMoney = (data: IBalance | null) => {
  return data ? `${formatter(data.code).format(Number(data.amount))}` : "";
};

export const _handleGetTargetMoney = (data: IBalance | null) => {
  return data
    ? `${formatter(data.targetMoneyCode).format(
        Number(data.amount) * Number(data.convertRateToTarget)
      )}`
    : "";
};
