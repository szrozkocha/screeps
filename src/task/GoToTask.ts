import { Task } from "./Task";
import { TaskType } from "./TaskType";

export class GoToTask extends Task {
  constructor(
    public destinationId: string,
    timeout: number
  ) {
    super(TaskType.GO_TO, timeout);
  }

  public static run(task: GoToTask, ant: Creep): boolean {
    const destination: RoomPosition | { pos: RoomPosition } = Game.getObjectById(task.destinationId) as RoomPosition | { pos: RoomPosition };

    const distance = ant.pos.getRangeTo(destination);

    if(distance > 1) {
      ant.moveTo(destination, {visualizePathStyle: {stroke: '#ffaa00'}});
      return false;
    } else {
      return true;
    }
  }
}