export type ClassConstructor<T> = new (...arg: any[]) => T;

export type PickOnlyType<T, I> = {
  [K in keyof T]: T[K] extends I ? I : never;
}[keyof T];

export type TargetMetadata = Object | Function;
export type PropertyKey = string | symbol;

export interface DefaultMetadata {
  propertyKey: PropertyKey;
  target: TargetMetadata;
}

export interface ExposeMetadata extends DefaultMetadata {
  options?: any;
}

export interface MedataOption {}

export interface ExposeMetadataOption extends MedataOption {}
export interface ExcludeMetadataOption extends MedataOption {}
