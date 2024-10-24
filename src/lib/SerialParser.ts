export const BAUD_RATES: Array<number> = [
  110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200,
  128000, 256000,
];

export enum SerialParserMode {
  READ = "read",
  WRITE = "write",
}

export default class SerialParser {
  /**
   * Stores an instance of the parser, so we avoid intiializing multiple
   * instances and breaking the serial connection.
   */
  static INSTANCE: SerialParser | null | undefined;

  /**
   * Stores the serial port connection.
   */
  static PORT: SerialPort | null | undefined;

  /**
   * Stores the previous port.
   */
  static PREVIOUS_PORT: SerialPort | null | undefined;

  /**
   * The mode to run the parser in, either "read" or "write"
   */
  static MODE: SerialParserMode | null | undefined;

  /**
   * The default baud rate to connect to the serial port at.
   */
  static BAUD: number;

  /**
   * If there parser's active and connected to a port.
   */
  public active: boolean = false;

  /**
   * If the port is open and ready to receive data.
   */
  public open: boolean = false;

  /**
   * The data received from the serial port.
   */
  public data: Array<number> = [];

  /**
   * The callback function to call when new data is received.
   */
  public onUpdateCallback!: (data: Array<number>) => void;

  /**
   * The callback function to call when the port is closed.
   */
  public onCloseCallback!: () => void;

  /**
   * The serial port stream.
   */
  protected stream: any;

  /**
   * The serial port reader.
   */
  protected reader: any;

  /**
   * The serial port readable stream.
   */
  protected readable: any;

  /**
   * The serial port writer.
   */
  protected writer: any;

  get baud() {
    return SerialParser.BAUD;
  }

  /**
   * Force closes the serial port connection.
   */
  static async forceClose() {
    if (SerialParser.INSTANCE) {
      await SerialParser.INSTANCE.closePort();
    }
  }

  /**
   * Initializes the serial parser.
   *
   * @param onUpdate
   *     The callback function to call when new data is received
   * @param onClose
   *     The callback function to call when the port is closed
   * @param mode
   *     The mode to run the parser in, either "read" or "write"
   * @returns
   */
  constructor(
    onUpdate?: (data: Array<number>) => void,
    onClose?: () => void,
    mode?: SerialParserMode
  ) {
    if (typeof navigator === "undefined") {
      throw new Error(
        "SerialParser is only available in a web browser environment."
      );
    }

    if (typeof navigator?.serial === "undefined") {
      throw new Error(
        "This browser does not support `navigator.serial`, please try it in a supported browser."
      );
    }

    if (onUpdate instanceof Function) {
      this.onUpdateCallback = onUpdate;
    }

    if (onClose instanceof Function) {
      this.onCloseCallback = onClose;
    }

    SerialParser.MODE = mode || SerialParserMode.READ;

    if (SerialParser.INSTANCE) {
      return SerialParser.INSTANCE;
    }

    SerialParser.INSTANCE = this;
  }

  /**
   * Sets the callback function to call when new data is received.
   *
   * @param callback
   *     The callback function to call when new data is received
   */
  setCallback(callback: (data: Array<number>) => void) {
    if (callback instanceof Function) {
      this.onUpdateCallback = callback;
    }
  }

  /**
   * Sets the callback function to call when the port is closed.
   *
   * @param callback
   *     The callback function to call when the port is closed
   */
  setCloseCallback(callback: () => void) {
    if (callback instanceof Function) {
      this.onCloseCallback = callback;
    }
  }

  /**
   * Sends the data to the serial port.
   *
   * @returns
   */
  async sendPortData(data: string) {
    if (!this.active && !SerialParser.PORT) return;

    if (SerialParser.MODE === SerialParserMode.READ) {
      console.warn("SerialParser is in read mode, cannot write data.");
      return;
    }

    const port = SerialParser.PORT;

    if (port?.writable) {
      const encoder = new TextEncoderStream();

      this.readable = encoder.readable.pipeTo(port.writable);
      this.writer = encoder.writable.getWriter();

      await this.writer.write(data);
      await this.writer.close();
    }
  }

  /**
   * Opens the serial port connection and starts reading data.
   *
   * @param breakOn
   *     The regex to break on when reading data
   *
   * @returns
   */
  async readPortData(breakOn?: RegExp) {
    if (!this.active && !SerialParser.PORT) return;

    if (SerialParser.MODE === SerialParserMode.WRITE) {
      console.warn("SerialParser is in write mode, cannot read data.");
      return;
    }

    const port = SerialParser.PORT;
    let pool = [];

    if (!port) return;

    while (port.readable) {
      if (!this.active) break;
      this.reader = port.readable.getReader();

      try {
        while (true) {
          if (!this.reader) break;

          const { value, done } = await this.reader.read();

          if ((done || !this.active) && this.reader) {
            this.reader.releaseLock();
            break;
          }

          if (value) {
            this.data = [...this.data, ...value];

            if (this.onUpdateCallback instanceof Function) {
              this.onUpdateCallback([...this.data]);
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  /**
   * Selects a serial port to connect to.
   *
   * @param baud
   *     The baud rate to connect to the port at
   * @param keepPreviousPortOpen
   *     Whether to keep the previous port identifier open or not
   */
  async selectPort(baud: number = 9600, dataBits: number, parity: string, keepPreviousPortOpen: boolean = false) {
    await this.closePort();

    let port: SerialPort;

    if (keepPreviousPortOpen && SerialParser.PREVIOUS_PORT) {
      port = SerialParser.PREVIOUS_PORT;
    } else {
      port = await navigator.serial.requestPort();
    }

    await port.open({ baudRate: baud || 9600 });

    SerialParser.BAUD = baud;
    SerialParser.PORT = port;

    if (keepPreviousPortOpen && !SerialParser.PREVIOUS_PORT) {
      SerialParser.PREVIOUS_PORT = port;
    }

    this.open = true;
    this.active = true;

    this.readPortData();
  }

  /**
   * Closes the current active port.
   */
  async closePort() {
    this.active = false;

    if (this.onCloseCallback instanceof Function) {
      this.onCloseCallback();
    }

    if (this.reader) {
      await this.reader.cancel();
      this.reader = null;
    }

    this.writer = null;

    if (SerialParser.PORT) {
      await SerialParser.PORT;
      await SerialParser.PORT.close();

      this.open = false;

      SerialParser.PORT = null;
    }
  }
}
