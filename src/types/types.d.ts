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

interface SourceMemory {
  accessPositions: { x: number; y: number }[];
  bondedAnts: Id<Creep>[];
  lostEnergy: number;
}

interface ConstructionSiteMemory {
  position: { x: number; y: number };
  type: BuildableStructureConstant;
}

interface RoomEntities {
  anthills: Id<StructureSpawn>[];
  ants: { id: Id<Creep>; name: string }[];
  energySources: { [id: string]: SourceMemory };
  constructionSites: ConstructionSiteMemory[];
}

interface RoomMemory {
  activeTasks: { [name: number]: Task[] };
  entities: RoomEntities;
  roadPlaner: RoadPlanerMemory;
}

interface RoadPlanerMemory {
  visitedCount: { [x: number]: { [y: number]: RoadData } };
}

interface RoadData {
  count: number;
  build: boolean;
}

interface Memory {
  initialized: boolean;
}
