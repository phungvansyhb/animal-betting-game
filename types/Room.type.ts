export type Room = {
  name: string;
  id: string;
  maxMember?: string;
  minBet?: number;
  hostId:string // connectionId 
  /* use presence api to track */
  // members: string[];
};

export enum STATUS_ENUM {
  ACTIVE = 'ACTIVE',
  INACTIVE = "INACTIVE"
}
export type User = {
  id: string;
  status: STATUS_ENUM;
  money: number;
  bets: number[];
  // isHost: boolean;
};

