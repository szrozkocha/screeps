import { TaskType } from "./TaskType";

export abstract class Task {
  protected constructor(
    public type: TaskType,
    public timeout: number
  ) {
  }
}
