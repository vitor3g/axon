import { Logger } from "./common/logger";
import * as pkg from "@/package.json";
import { drawFiglet } from "./common/utils";

import { Binance } from "@/sdk/binance";
import { Asaas } from "@/sdk/asaas";

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
  
  // hackfix: temporary asaas account registration status to preceed
  await Asaas.checkRegistrationStatus();
}

bootstrap();
