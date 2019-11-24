import Task from '../Task';
import TaskTag from '../TaskTag';
import TaskType from '../TaskType';

export default class BuildTask extends Task {
  constructor(public targetId: Id<ConstructionSite>, timeout: number, creatorId: Id<any>, tags?: TaskTag[]) {
    super(TaskType.BUILD, timeout, creatorId, tags);
  }

  public static run(task: BuildTask, ant: Creep): boolean {
    const constructionSite: ConstructionSite = Game.getObjectById(task.targetId) as ConstructionSite;

    if (!constructionSite) {
      return true;
    }

    ant.build(constructionSite);

    return ant.store.getUsedCapacity() <= 0;
  }
}
