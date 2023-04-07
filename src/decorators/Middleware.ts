import Container from '../utils/container';

const Middleware = () => {
  return (target: any) => {
    Reflect.getMetadataKeys(target).forEach(key => {
      target[key] = Reflect.getMetadata(key, target);
    });

    Container.set(target, target);
  };
};

export default Middleware;
