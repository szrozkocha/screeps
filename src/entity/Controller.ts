import TaskType from '../task/TaskType';
import CompoundTask from '../task/CompoundTask';
import GoToTask from '../task/ant/GoToTask';
import TaskTag from '../task/TaskTag';
import UpgradeControllerTask from '../task/ant/UpgradeControllerTask';

export default class Controller {
  public static tick(controller: StructureController): void {
    const upgradeTasksNeeded = controller.room.memory.entities.ants.length;

    controller.room.visual.text(`Level: ${controller.level}`, controller.pos.x + 1, controller.pos.y, {
      align: 'left',
      opacity: 0.8,
    });

    for (let i = 0; i < upgradeTasksNeeded; ++i) {
      controller.room.memory.activeTasks[TaskType.COMPOUND].push(
        new CompoundTask(
          [
            new GoToTask(controller.id, Number.MAX_VALUE, controller.id, 3),
            new UpgradeControllerTask(controller.id, Number.MAX_VALUE, controller.id),
          ],
          1,
          controller.id,
          [TaskTag.FULL_ANT],
        ),
      );
    }
  }
}
