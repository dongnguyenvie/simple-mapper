import { metadataStorage } from './meta-data-storage';
import { ClassConstructor } from './types';

const ORIGINAL = '__orginal__';
class TransformExecutor {
  private _originalMap = new Map();

  exec<T>(Destination: ClassConstructor<T>, rawData: T) {
    const instance = new Destination();
    Object.assign(instance, rawData);
    const metadatas = metadataStorage.getExcludedProperties(Destination);
    let keys = [];
    if (metadatas) {
      keys = Array.from(metadatas.values()).map(
        (metadata) => metadata.propertyKey
      );
    }

    keys.forEach((propertyKey) => {
      const descriptor = Object.getOwnPropertyDescriptor(
        instance.constructor.prototype,
        propertyKey
      );

      if (descriptor) {
        descriptor.enumerable = false;
      }
      let value = instance[propertyKey];
      if (delete instance[propertyKey]) {
        // Object.defineProperty(instance, ORIGINAL, {
        //   get: () => this._originalMap,
        //   set: ([key, value]) => {
        //     if (!this._originalMap.has(instance)) {
        //       this._originalMap.set(instance, new Map());
        //     }
        //     this._originalMap.set(key, value);
        //   },
        //   enumerable: false,
        //   configurable: false,
        // });
        Object.defineProperty(instance, propertyKey, {
          get: () => value,
          set: (newVal) => (value = newVal),
          enumerable: false,
          configurable: false,
        });
      }
    });
    return instance;
  }
}

export const transformExecutor = new TransformExecutor();
