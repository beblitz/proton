import ProtonError from '../core/ProtonError';

const Execute = (): MethodDecorator => {
  return (target: any, propertyKeys: string | symbol) => {
    ProtonError.throwIf(
      target.constructor.execute,
      'Execute decorator can only be used once per middleware'
    );

    target.constructor.execute = target[propertyKeys];
  };
};

export default Execute;
