import TaskType from '../task/TaskType';
import CompoundTask from '../task/CompoundTask';
import GoToTask from '../task/ant/GoToTask';
import TaskTag from '../task/TaskTag';
import BuildTask from '../task/ant/BuildTask';

export default class BuildPlanerService {
  public static createBuildConstructionSiteTasks(roomName: string): void {
    const constructionSites = Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES);

    constructionSites.forEach(constructionSite => {
      Memory.rooms[roomName].activeTasks[TaskType.COMPOUND].push(
        new CompoundTask(
          [
            new GoToTask(constructionSite.id, Number.MAX_VALUE, constructionSite.id, 3),
            new BuildTask(constructionSite.id, Number.MAX_VALUE, constructionSite.id),
          ],
          1,
          constructionSite.id,
          [TaskTag.FULL_ANT],
        ),
      );
    });
  }
}
