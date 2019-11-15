import { Task } from "./Task";
import { TaskType } from "./TaskType";
import { CreateAntTask } from "./CreateAntTask";
import { GoToTask } from "./GoToTask";
import { CompoundTask } from "./CompoundTask";
import { HarvestTask } from "./HarvestTask";

export class TaskRunner {
  public static run<TARGET>(target: TARGET, task: Task): boolean {
    switch (task.type) {
      case TaskType.CREATE_ANT:
        // @ts-ignore
        return CreateAntTask.run(target);
      case TaskType.GO_TO:
        // @ts-ignore
        return GoToTask.run(<GoToTask>task, target);
      case TaskType.COMPOUND:
        return CompoundTask.run(<CompoundTask>task, target);
      case TaskType.HARVEST:
        // @ts-ignore
        return HarvestTask.run(<HarvestTask>task, target);
    }
  }
}