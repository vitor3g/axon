import { configDotenv } from "dotenv";
import { z } from "zod";

configDotenv()

const schema = z.object({
  NODE_ENV: z.string().default("DEVELOPMENT"),
  BINANCE_API_KEY: z.string().nonempty(),
  BINANCE_API_SECRET: z.string().nonempty(),
  ASAAS_API_KEY: z.string().nonempty()
});

export const env = schema.parse(process.env);
