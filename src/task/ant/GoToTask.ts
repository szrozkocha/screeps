import Task from '../Task';
import TaskType from '../TaskType';
import TaskTag from '../TaskTag';

export default class GoToTask extends Task {
  constructor(
    public destinationId: Id<any>,
    timeout: number,
    creatorId: Id<any>,
    public proximity: number = 1,
    tags?: TaskTag[],
  ) {
    super(TaskType.GO_TO, timeout, creatorId, tags);
    this.proximity = proximity;
  }
  public static run(task: GoToTask, ant: Creep): boolean {
    const destination: RoomPosition | { pos: RoomPosition } = Game.getObjectById(task.destinationId) as
      | RoomPosition
      | { pos: RoomPosition };

    const distance = ant.pos.getRangeTo(destination);

    if (distance > task.proximity) {
      ant.moveTo(destination, { visualizePathStyle: { stroke: '#ffaa00' } });
      return false;
    }
    return true;
  }
}
