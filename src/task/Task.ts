import TaskType from './TaskType';
import TaskTag from './TaskTag';

let taskId: number = 0;

export default abstract class Task {
  public id: number;

  public type: TaskType;

  public timeout: number;

  public creatorId: Id<any>;

  public tags?: TaskTag[];

  protected constructor(type: TaskType, timeout: number, creatorId: Id<any>, tags?: TaskTag[]) {
    this.id = taskId++;
    this.type = type;
    this.timeout = timeout;
    this.creatorId = creatorId;
    this.tags = tags;
  }
}
