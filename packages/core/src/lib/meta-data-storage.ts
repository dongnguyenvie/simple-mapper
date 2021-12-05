import {
  ExposeMetadata,
  TargetMetadata,
  PropertyKey,
  DefaultMetadata,
} from './types';

export class MetadataStorage {
  private _exposeStorage = new Map<
    TargetMetadata,
    Map<PropertyKey, ExposeMetadata>
  >();

  private _excludeStorage = new Map<
    TargetMetadata,
    Map<PropertyKey, ExposeMetadata>
  >();

  public addExposeMetadata(metadata: ExposeMetadata) {
    if (!this._exposeStorage.has(metadata.target)) {
      this._exposeStorage.set(
        metadata.target,
        new Map<string, ExposeMetadata>()
      );
    }
    this._exposeStorage
      .get(metadata.target)
      .set(metadata.propertyKey, metadata);
  }

  public addExcludeMetadata(metadata: ExposeMetadata) {
    if (!this._excludeStorage.has(metadata.target)) {
      this._excludeStorage.set(
        metadata.target,
        new Map<string, ExposeMetadata>()
      );
    }
    this._excludeStorage
      .get(metadata.target)
      .set(metadata.propertyKey, metadata);
  }

  public get exposeStorage() {
    return this._exposeStorage;
  }

  public get excludeStorage() {
    return this._excludeStorage;
  }

  public getExposeMetadata(target: TargetMetadata) {}

  public getExcludeMetadata(target: TargetMetadata) {
    const metadataFromTarget = this._excludeStorage.get(target);
    if (metadataFromTarget) return metadataFromTarget;
    return null;
  }

  public getExcludedProperties(target: TargetMetadata) {
    return this._getExcludedMetadatas(target);
  }

  public getExposedProperties(target: TargetMetadata) {
    return this._getExposedMetadatas(target);
  }

  private _getExposedMetadatas(target: TargetMetadata): ExposeMetadata[] {
    return this._getMetadata(this._exposeStorage, target);
  }

  private _getExcludedMetadatas(target: TargetMetadata): ExposeMetadata[] {
    return this._getMetadata(this._excludeStorage, target);
  }

  private _getMetadata<T extends DefaultMetadata>(
    storage: Map<TargetMetadata, Map<PropertyKey, T>>,
    target: TargetMetadata
  ): T[];
  private _getMetadata<T extends DefaultMetadata>(
    storage: Map<TargetMetadata, Map<PropertyKey, T>>,
    target: TargetMetadata
  ) {
    let metadatas: T[] = [];
    const getMapFromTarget = storage.get(target);

    if (getMapFromTarget) {
      metadatas = Array.from(getMapFromTarget.values()).filter(
        (metadata) => !!metadata.propertyKey
      );
    }
    return metadatas;
  }

  public findExposeMetadata(target: TargetMetadata, propertyKey: PropertyKey) {
    return this._findMetadata(this._exposeStorage, target, propertyKey);
  }

  private _findMetadata(
    metadata: Map<TargetMetadata, Map<PropertyKey, ExposeMetadata>>,
    target: TargetMetadata,
    propertyKey: PropertyKey
  ) {
    const metadataStorage = metadata.get(target);
    if (metadata) {
      const metadataFromProperty = metadataStorage.get(propertyKey);
      if (metadataFromProperty) return metadataFromProperty;
    }
  }
}

export const metadataStorage = new MetadataStorage();
