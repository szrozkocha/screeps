declare enum TaskType {
  CREATE_ANT = 0,
  GO_TO = 1,
  COMPOUND = 2,
  HARVEST = 3,
  TRANSFER = 4,
  UPGRADE_CONTROLLER = 5,
}

declare enum TaskTag {
  EMPTY_ANT = 'EMPTY_ANT',
  FULL_ANT = 'FULL_ANT',
}

declare interface Task {
  id: number;
  type: TaskType;
  timeout: number;
  creatorId: Id<any>;
  tags?: TaskTag[];
}
