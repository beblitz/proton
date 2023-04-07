import socket from 'socket.io';

type EventHandler = (socket: socket.Socket, ...args: any[]) => void;

interface Event {
  name: string;
  handler: EventHandler;
}

export default Event;
