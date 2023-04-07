import Server from '../core/Server';
import Event from '../types/Event';
import Container from '../utils/container';
import socket from 'socket.io';
import logger from '../utils/logger';

const SocketController = () => {
  return (target: any) => {
    const instance = new target();

    Reflect.getMetadataKeys(target).forEach(key => {
      instance[key] = Reflect.getMetadata(key, target);
    });

    instance.init = () => {
      const server = Container.get<Server>('server');

      const connectionEvent = instance?.events?.find((e: Event) => {
        return e.name === 'connection';
      });

      if (!connectionEvent) {
        server.io.on('connection', (socket: socket.Socket) => {
          instance.events?.map((event: Event) => {
            socket.on(event.name, event.handler.bind(instance)(socket));
          });
        });
      } else {
        server.io.on('connection', (socket: socket.Socket) => {
          instance.events?.map((event: Event) => {
            if (event.name !== 'connection') {
              socket.on(event.name, (...args) => {
                event.handler.bind(instance)(socket, ...args);
              });
            }
          });

          connectionEvent.handler.bind(instance)(socket);
        });
      }
    };

    Container.set(target, instance);
  };
};

export default SocketController;
