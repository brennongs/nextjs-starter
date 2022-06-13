import Contract, {
  Observer,
  Subscriber
} from './.d';

export class Observable<T> implements Contract<T> {
  observers: Array<Observer<T>> = []
  state: T;

  constructor(state: T) {
    this.state = { ...state }
  }

  emit(action: (state: T) => T) {
    if (action) {
      const result = action(this.state)
      if (result) this.state = {...result}
    }

    this.observers.forEach(observer => {
      observer.handle(this.state)
    })

    return this;
  };

  subscribe(handle: (state: T) => any): Subscriber {
    const observer: Observer<T> = {
      id: Symbol('id'),
      handle
    }

    this.observers.push(observer)
    observer.handle(this.state)

    return {
      unsubscribe: () => {
        this.unsubscribe(observer.id)
      }
    }
  }

  unsubscribe(id: Symbol): void {
    this.observers = this.observers.filter(observer => observer.id !== id)
  };
}
