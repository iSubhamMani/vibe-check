export interface Music {
  createdAt: string;
  id: string;
  roomCode: string;
  votes: number[];
  votesCount: number;
  isVoted: boolean;
  musicId: string;
}
