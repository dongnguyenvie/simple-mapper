import { metadataStorage } from '../meta-data-storage';
import { ExcludeMetadataOption } from '../types';

export function Exclude(
  options: ExcludeMetadataOption = {}
): MethodDecorator & PropertyDecorator {
  return function (
    object: object,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ): void {
    metadataStorage.addExcludeMetadata({
      target: object.constructor,
      propertyKey: propertyKey,
      options: options,
    });
  };
}
