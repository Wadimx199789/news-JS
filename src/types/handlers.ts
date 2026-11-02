export type SourceSelectHandler = (sourceId: string) => void;

export type Callback<T> = (data: T) => void;

export type ErrorCallback = (error: Error) => void;
