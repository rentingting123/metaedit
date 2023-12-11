
const LegacyStreamerId = "__LEGACY__";

const def_config = {
  uePort: 8888,
  webPort: 8889,
};


class PSServe {


  constructor(config) {

    this._config = Object.assign(config, def_config);
    this.ueio = null;
    this.webio = null;

    this.streamerMap = new Map;
    this.streamerMessageHandlers = new Map;

  }

  setupUe(port) {

    const io = this.ueio = new WebSocket.Server({ port: port, backlog: 1 });

    io.on('connection', (ws, req) => {

      console.logColor(logging.Green, `Streamer connected: ${req.connection.remoteAddress}`);

      let streamer = { ws: ws };

      ws.on('message', (msgRaw) => {
        var msg;
        try {
          msg = JSON.parse(msgRaw);
        } catch (err) {
          console.error(`Cannot parse Streamer message: ${msgRaw}\nError: ${err}`);
          ws.close(1008, 'Cannot parse');
          return;
        }

        let handler = this.streamerMessageHandlers.get(msg.type);
        if (!handler || (typeof handler != 'function')) {
          console.error(`unsupported Streamer message type: ${msg.type}`);
          ws.close(1008, 'Unsupported message type');
          return;
        }
        handler(streamer, msg);
      });

      ws.on('close', function (code, reason) {
        console.error(`streamer ${streamer.id} disconnected: ${code} - ${reason}`);
        this.onStreamerDisconnected(streamer);
      });

      ws.on('error', function (error) {
        console.error(`streamer ${streamer.id} connection error: ${error}`);
        this.onStreamerDisconnected(streamer);
        try {
          ws.close(1006 /* abnormal closure */, error);
        } catch (err) {
          console.error(`ERROR: ws.on error: ${err.message}`);
        }
      });

      ws.send(JSON.stringify(clientConfig));

      const msg = { type: "identify" };
      ws.send(JSON.stringify(msg));
      this.registerStreamer(LegacyStreamerId, streamer);
    });

  }
  onStreamerDisconnected(streamer) {
    if (!streamer.id) {
      return;
    }

    if (!streamers.has(streamer.id)) {
      console.error(`Disconnecting streamer ${streamer.id} does not exist.`);
    } else {
      sendStreamerDisconnectedToMatchmaker();
      let sfuPlayer = getSFU();
      if (sfuPlayer) {
        const msg = { type: "streamerDisconnected" };
        logOutgoing(sfuPlayer.id, msg);
        sfuPlayer.sendTo(msg);
        disconnectAllPlayers(sfuPlayer.id);
      }
      disconnectAllPlayers(streamer.id);
      streamers.delete(streamer.id);
    }
  }
  registerStreamer(id, streamer) {
    streamer.id = id;
    streamers.set(streamer.id, streamer);
  }
  onStreamerMessageId(streamer, msg) {

    let streamerId = msg.id;
    registerStreamer(streamerId, streamer);

    // subscribe any sfu to the latest connected streamer
    const sfuPlayer = getSFU();
    if (sfuPlayer) {
      sfuPlayer.subscribe(streamer.id);
    }

    // if any streamer id's assume the legacy streamer is not needed.
    streamers.delete(LegacyStreamerId);
  }



  setupWeb(port) {

    this.webio = new WebSocket.Server({ port: this._config.webPort, backlog: 1 });


  }

}


export { PSServe }
