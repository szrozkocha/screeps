import { Task } from "./Task";
import { TaskType } from "./TaskType";
import { TaskRunner } from "./TaskRunner";
import { TaskTag } from "./TaskTag";

export class CompoundTask extends Task {
  constructor(
    public subtasks: Task[],
    timeout: number,
    tags?: TaskTag[]
  ) {
    super(TaskType.COMPOUND, timeout, tags);
  }

  public static runAnthill(task: CompoundTask, target: StructureSpawn): boolean {
    if(task.subtasks.length === 0) {
      return true;
    } else {
      const subtask = task.subtasks[0];

      const ended = TaskRunner.runAnthill(target, subtask);

      if(ended) {
        task.subtasks.shift();
      }

      return task.subtasks.length === 0;
    }
  }

  public static runAnt(task: CompoundTask, target: Creep): boolean {
    if(task.subtasks.length === 0) {
      return true;
    } else {
      const subtask = task.subtasks[0];

      const ended = TaskRunner.runAnt(target, subtask);

      if(ended) {
        task.subtasks.shift();
      }

      return task.subtasks.length === 0;
    }
  }
}