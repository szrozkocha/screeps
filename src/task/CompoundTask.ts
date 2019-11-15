import { Task } from "./Task";
import { TaskType } from "./TaskType";
import { TaskRunner } from "./TaskRunner";

export class CompoundTask extends Task {
  constructor(
    public subtasks: Task[],
    timeout: number
  ) {
    super(TaskType.COMPOUND, timeout);
  }

  public static run<TARGET>(task: CompoundTask, target: TARGET): boolean {
    if(task.subtasks.length === 0) {
      return true;
    } else {
      const subtask = task.subtasks[0];

      const ended = TaskRunner.run(target, subtask);

      if(ended) {
        task.subtasks.shift();
      }

      return task.subtasks.length === 0;
    }
  }
}