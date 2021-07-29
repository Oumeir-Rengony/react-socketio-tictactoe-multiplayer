import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { io, Socket } from "socket.io-client";

class SocketService {

    public socket: Socket | null = null;

    public connect(url :string): Promise<Socket<DefaultEventsMap,DefaultEventsMap>> {
        return new Promise((resolve, reject) => {
            this.socket = io(url);

            if(!this.socket)
                reject();

            this.socket.on("connect", () => {
                resolve(this.socket as Socket);
            });

            this.socket.on("connect_error", (err) => {
                console.log("Connection error: ", err);
                reject(err);
            });
        });
    }
}

export default new SocketService();