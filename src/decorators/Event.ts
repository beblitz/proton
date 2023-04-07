import Event from '../types/Event';

const Event = (event: string): MethodDecorator => {
  return (target: any, propertyKey: string | symbol) => {
    const events: Event[] =
      Reflect.getMetadata('events', target.constructor) || [];

    events.push({
      name: event,
      handler: target[propertyKey],
    });

    Reflect.defineMetadata('events', events, target.constructor);
  };
};

export default Event;
