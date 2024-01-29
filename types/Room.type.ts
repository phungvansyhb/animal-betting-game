export type Room = {
  name: string;
  id: string;
  maxMember?: string;
  minBet?: number;
};

export type currentRoom = {
  id: string;
  name: string;
  minBet: number;
  members: User[];
  status: "betting" | "start";
};

export type User = {
  id: string;
  isActive: boolean;
  money: number;
  bets: number[];
  isHost: boolean;
};
