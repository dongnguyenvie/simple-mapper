import { metadataStorage } from '../meta-data-storage';
import { ExposeMetadataOption } from '../types';

export function Expose(
  options: ExposeMetadataOption = {}
): PropertyDecorator & ClassDecorator {
  return function (object: object, propertyKey?: string | symbol): void {
    metadataStorage.addExposeMetadata({
      target: object,
      propertyKey: propertyKey,
      options: options,
    });
  };
}
