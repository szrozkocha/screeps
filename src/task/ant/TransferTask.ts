import Task from '../Task';
import TaskTag from '../TaskTag';
import TaskType from '../TaskType';

export default class TransferTask extends Task {
  constructor(public targetId: Id<any>, timeout: number, creatorId: Id<any>, tags?: TaskTag[]) {
    super(TaskType.TRANSFER, timeout, creatorId, tags);
  }

  public static run(task: TransferTask, ant: Creep): boolean {
    const source: AnyCreep | Structure = Game.getObjectById(task.targetId) as AnyCreep | Structure;

    ant.transfer(source, RESOURCE_ENERGY);

    return true;
  }
}
