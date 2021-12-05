import { ClassConstructor } from '../types';
import { ObjectToInstance } from './object-to-instance';

export class Mapper {
  constructor(private _objectToInstance: ObjectToInstance) {}

  public objectToInstance<T>(
    Destination: ClassConstructor<T>,
    rawData: Record<string, any>
  ): T;
  objectToInstance(Destination, rawData) {
    return this._objectToInstance.transform(Destination, rawData);
  }
}
