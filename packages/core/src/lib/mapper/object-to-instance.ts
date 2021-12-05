import { metadataStorage } from '../meta-data-storage';

export class ObjectToInstance {
  transform<T>(Destination: new (params?: any[]) => T, rawData: Required<T>) {
    const instance = new Destination();

    const metadatas = metadataStorage.getExcludedProperties(Destination);
    let keys = [];
    if (metadatas) {
      keys = Array.from(metadatas.keys());
    }

    keys.forEach((propertyKey) => {
      const descriptor = Object.getOwnPropertyDescriptor(
        instance.constructor.prototype,
        propertyKey
      );

      if (descriptor) {
        descriptor.enumerable = false;
      }
      let _val = instance[propertyKey];
      if (delete instance[propertyKey]) {
        Object.defineProperty(instance as any, propertyKey, {
          get: () => _val,
          set: (newVal) => (_val = newVal),
          enumerable: false,
          configurable: false,
        });
      }
    });
  }
}
