declare enum TaskType {
  CREATE_ANT = 0,
  GO_TO = 1,
  COMPOUND = 2,
  HARVEST = 3
}

interface Task {
  type: TaskType;
}

interface GoToTask extends Task {
  destinationId: string;
}

interface CompoundTask extends Task {
  subtasks: Task[];
}

interface HarvestTask extends Task {
  sourceId: string;
  amount: number;
}