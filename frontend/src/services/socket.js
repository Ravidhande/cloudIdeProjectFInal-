import { io as socketIO } from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

let socketInstance = null;

export const socketService = {
  connect: (token) => {
    if (socketInstance?.connected) return socketInstance;

    socketInstance = socketIO(API_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    return socketInstance;
  },

  disconnect: () => {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
    }
  },

  getInstance: () => socketInstance,

  on: (event, handler) => {
    if (socketInstance) {
      socketInstance.on(event, handler);
    }
  },

  emit: (event, data) => {
    if (socketInstance) {
      socketInstance.emit(event, data);
    }
  },

  off: (event, handler) => {
    if (socketInstance) {
      socketInstance.off(event, handler);
    }
  },
};
