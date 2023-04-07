import Container from '../utils/container';

declare type constructor<T> = {
  new (...args: any[]): T;
};

const Use = (value: constructor<unknown>): PropertyDecorator => {
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(
      propertyKey,
      Container.get(value),
      target.constructor
    );
  };
};

export default Use;
