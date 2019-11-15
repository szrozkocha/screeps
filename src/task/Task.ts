import { TaskType } from "./TaskType";
import { TaskTag } from "./TaskTag";

export abstract class Task {
  protected constructor(
    public type: TaskType,
    public timeout: number,
    public tags?: TaskTag[]
  ) {
  }
}
