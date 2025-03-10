export {};

interface IApis {
    core: string;
    anyLogic: string;
    elipse: string;
    angeLira: string;
    user: string;
    socket: string;
}

interface IAbout {
    version: string;
    client: string;
    lastUpdate: string;
}

declare global {
  interface Window {
    apis: IApis;
    about: IAbout;
    cnx: {
      product:{
        list()
      } 
    }
  }
}
