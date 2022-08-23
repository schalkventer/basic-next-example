export type phase = "resting" | "adding";

export type task = {
  id: string;
  title: string;
  completed: boolean;
};

export type props = {
  tasks: task[];
};
