import { binance } from "@/libs/binance";
import { Logger } from "@/monitor/common/logger";

class BinanceStatic {
  private readonly logger = new Logger("axon::binance");

  constructor() {}

  public async checkStatus() {
    this.logger.log("Checking binance system status.");

    const status = await binance.getSystemStatus();

    if (status.status === 1) {
      this.logger.log("Binance system is in maintenance, exiting...");
      throw new Error("Binance system is in maintenance");
    }

    this.logger.log("binance system's is operational.");
  }
}

export const Binance = new BinanceStatic();
