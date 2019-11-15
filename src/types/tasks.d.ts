declare enum TaskType {
  CREATE_ANT = 0,
  GO_TO = 1,
  COMPOUND = 2,
  HARVEST = 3
}

declare interface Task {
  type: TaskType;
  timeout: number;
}
