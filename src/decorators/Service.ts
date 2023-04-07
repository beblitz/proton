import Container from '../utils/container';

const Service = () => {
  return (target: any) => {
    const instance = new target();

    Reflect.getMetadataKeys(target).forEach(key => {
      instance[key] = Reflect.getMetadata(key, target);
    });

    Container.set(target, instance);
  };
};

export default Service;
