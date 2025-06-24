import { Logger } from "./common/logger";
import * as pkg from "@/package.json";
import { drawFiglet } from "./common/utils";

import { binance } from "@/libs/binance";
import { Binance } from "@/data/binance";

async function bootstrap() {
  const logger = new Logger("axon::monitor");

  await drawFiglet();

  logger.log("name: axion");
  logger.log("description: axon's monitor ");
  logger.log(`version: ${pkg.version}     `);
  logger.log("                            ");
  logger.log("Press CTRL+C to exit.       ");
  logger.log("                            ");

  // hackfix: temporary binance health check
  await Binance.checkStatus();

  process.stdin.resume();
}

bootstrap();
