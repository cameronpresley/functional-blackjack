export class Option<T> {
  private constructor(private readonly value?: T) {}

  static some<T>(value: T): Option<T> {
    return new Option(value);
  }

  static none<T>(): Option<T> {
    return new Option();
  }

  map<U>(f: (t: T) => U): Option<U> {
    if (this.value) {
      return Option.some(f(this.value));
    }
    return Option.none();
  }

  bind<U>(f: (t: T) => Option<U>): Option<U> {
    if (this.value) {
      return f(this.value);
    }
    return Option.none();
  }

  tap(ifSome: (t: T) => void, ifNone: () => void): Option<T> {
    if (this.value) {
      ifSome(this.value);
    } else {
      ifNone();
    }
    return this;
  }
}
