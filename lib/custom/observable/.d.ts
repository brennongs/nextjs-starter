export type Observer<T> = {
  id: Symbol;
  handle: (state: T) => any
}

export type Subscriber = {
  unsubscribe: () => void;
}

export default interface Observable<T> {
  state: T;
  observers: Array<Observer<T>>;
  emit: (action: (state: T) => T) => Observable<T>;
  subscribe: (handle: Observer<T>['handle']) => Subscriber;
  unsubscribe: (id: Observer<T>['id']) => void;
}