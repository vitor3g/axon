import { configDotenv } from "dotenv";
import { z } from "zod";

configDotenv()

const schema = z.object({
  BINANCE_API_KEY: z.string().nonempty(),
  BINANCE_API_SECRET: z.string().nonempty(),
});

export const env = schema.parse(process.env);
