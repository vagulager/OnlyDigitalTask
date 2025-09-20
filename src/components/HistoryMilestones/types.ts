export interface IMilestone {
  id: number;
  year: number;
  text: string;
}

export interface ITimeline {
  id: number;
  theme: string;
  milestones: IMilestone[];
}
