import { container } from 'tsyringe';

declare type constructor<T> = {
  new (...args: any[]): T;
};
export default class Container {
  public static get<T>(token: constructor<T> | string | symbol): T {
    return container.resolve(token);
  }

  public static set<T>(token: string, value: T): void {
    container.register(token, { useValue: value });
  }

  public static setSingleton<T>(value: constructor<T>): void {
    container.registerSingleton(value);
  }
}
