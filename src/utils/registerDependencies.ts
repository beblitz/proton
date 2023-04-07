import Container from './container';
import logger from './logger';

const registerDependencies = (target: any) => {
  const dependencies: string[] =
    Reflect.getMetadata('dependencies', target) || [];

  dependencies.forEach((dependency: string) => {
    const [property, name] = dependency.split(':');

    try {
      const service = Container.get(name);

      target.prototype[property] = service;
    } catch (e) {
      logger.warn(
        `Error while loading ${target.name}, it seems that the dependency ${name} is not registered, please check your dependency name and make sure that it have the @Service decorator.`
      );
      throw new Error();
    }
  });
};

export default registerDependencies;
