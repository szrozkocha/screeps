interface CreepMemory {
  activeTask?: Task;
  bondedSourceId?: Id<Source>;
}
interface FlagMemory {
  [name: string]: any;
}

interface SpawnMemory {
  activeTask?: Task;
  spawningAntName?: string;
}

interface RoomEntities {
  anthills: Id<StructureSpawn>[];
  ants: { id: Id<Creep>; name: string }[];
  energySources: { [id: string]: SourceMemory };
}

interface SourceMemory {
  accessPositions: { x: number; y: number }[];
  bondedAnts: Id<Creep>[];
  lostEnergy: number;
}

interface RoomMemory {
  activeTasks: { [name: number]: Task[] };
  entities: RoomEntities;
}

interface Memory {
  initialized: boolean;
}
