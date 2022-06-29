import {
  ACTIVE_STATE,
  AWAY_STATE,
  OFFLINE_STATE,
  BUSY_STATE,
} from "constants/index";

export interface IBalance {
  id: number;
  code: string;
  amount: string;
  convertRateToTarget: string;
  targetMoneyCode: string;
  logo: string;
}

export interface IProfile {
  name: string;
  status:
    | typeof ACTIVE_STATE
    | typeof AWAY_STATE
    | typeof OFFLINE_STATE
    | typeof BUSY_STATE;
  walletCode: string;
  balance: IBalance[];
}
