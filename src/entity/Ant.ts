import TaskRunner from '../task/TaskRunner';

enum AntState {
  FREE = '🚬',
}

export default class Ant {
  public static tick(id: { id: Id<Creep>; name: string }, roomMemory: RoomMemory): void {
    const ant = Game.getObjectById(id.id);

    if (!ant) {
      console.log('ant is dead!');
      const antMemory = Memory.creeps[id.name];
      if (antMemory.bondedSourceId) {
        const sourceMemory = roomMemory.entities.energySources[antMemory.bondedSourceId as string];

        sourceMemory.bondedAnts = sourceMemory.bondedAnts.filter(antId => antId !== id.id);
        roomMemory.entities.ants = roomMemory.entities.ants.filter(antId => antId.id !== id.id);
      }
      return;
    }

    if (!ant.memory.activeTask) {
      Ant.say(ant, AntState.FREE);
      return;
    }

    const ended = TaskRunner.runAnt(ant, ant.memory.activeTask);

    if (ended) {
      ant.memory.activeTask = undefined;
    }
  }

  private static say(ant: Creep, message: string): void {
    ant.room.visual.text(message, ant.pos.x + 1, ant.pos.y, { align: 'left', opacity: 0.8 });
  }
}
