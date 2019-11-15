import { Task } from "./Task";
import { TaskTag } from "./TaskTag";
import { TaskType } from "./TaskType";

export class TransferTask extends Task {
  constructor(
    public targetId: string,
    timeout: number,
    tags?: TaskTag[]
  ) {
    super(TaskType.TRANSFER, timeout, tags);
  }

  public static run(task: TransferTask, ant: Creep): boolean {
    const source: AnyCreep | Structure = Game.getObjectById(task.targetId) as AnyCreep | Structure;

   ant.transfer(source, RESOURCE_ENERGY);

    return true;
  }
}