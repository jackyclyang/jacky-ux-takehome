export type Person = {
  img: string;
  id: string;
  affinityToMe: number;
  name: string;
};

export type Event = {
  people: Person[];
  name: string;
  arc: number;
  radius: number;
  duration: number;
  starts: string;
  id: string;
};

export type Skills = {
  computation: number;
  biological: number;
  mechanical: number;
};

export type Job = {
  estimatedHours: number,
  id: string,
  arc: number,
  radius: number,
  latestStartDate: string,
  skillReqs: Skills,
  credits: number,
}
