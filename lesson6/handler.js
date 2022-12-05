export class Handler {
  static send(payload) {
    return {
      type: "connection",
      payload: `Пользователь ${payload}`,
    };
  }
  static receive(payload) {
    return {
      type: "disconnect",
      payload: `Пользователь ${payload}`,
    };
  }
  static sign(payload) {
    return {
      type: "reconnect",
      payload: `Пользователь ${payload}`,
    };
  }
}
