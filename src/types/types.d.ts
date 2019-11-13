interface CreepMemory { [name: string]: any; }
interface FlagMemory { [name: string]: any; }

interface SpawnMemory {
  activeTask?: Task;
  spawningAntName?: string;
}

interface RoomEntities {
  anthills: string[];
  ants: string[];
}

interface RoomMemory {
  activeTasks: {[name: number]: Task[]};
  entities: RoomEntities;
}

interface Memory {
  initialized: boolean;
}

interface Store {
  getCapacity(resource?: string): number;
  getFreeCapacity(resource?: string): number;
  getUsedCapacity(resource?: string): number;
}

interface Creep {
  store: Store;
}

interface StructureExtension {
  store: Store;
}

interface StructureSpawn {
  store: Store;
}

interface StructureTower {
  store: Store;
}

declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
