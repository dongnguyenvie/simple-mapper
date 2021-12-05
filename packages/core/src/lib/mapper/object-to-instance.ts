import { metadataStorage } from '../meta-data-storage';
import { transformExecutor } from '../transform-executor';
import { ClassConstructor } from '../types';

export class ObjectToInstance {
  transform<T>(Destination: ClassConstructor<T>, rawData: Required<T>) {
    const instance = transformExecutor.exec(Destination, rawData);
    return instance;
  }
}
