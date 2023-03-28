import { container } from 'tsyringe';

export default class Container {
  public static get<T>(token: string): T {
    return container.resolve(token);
  }

  public static set<T>(token: string, value: T): void {
    container.register(token, { useValue: value });
  }
}
