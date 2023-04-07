import Container from '../utils/container';

const registerDependencies = (dependencies: any[], target: any) => {
  dependencies.forEach(d => {
    try {
      const instance = Container.get(d);

      Object.defineProperty(target, instance['key'], {
        get: () => instance,
      });
    } catch (err) {
      throw new Error(
        `Dependency ${d} not found. Please register it before using it.`
      );
    }
  });
};

export default registerDependencies;
