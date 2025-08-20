import { env } from "@/env";
import { Logger } from "@/monitor/common/logger";
import axios from "axios";

class AsaasStatic {
  private readonly logger = new Logger("axon::asaas");

  public finance = {
    getActualBalance: async (): Promise<{ balance: number }> => {
      const uri = "/finance/balance";
      return await this.call(uri, "GET");
    },
  };

  public info = {
    getAccountRegistrationStatus: async () => {
      const uri = "/myAccount/status/";
      return await this.call(uri, "GET");
    },
  };

  constructor() {}

  private async call(
    path: string,
    method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT",
    post?: object
  ) {
    const data = await axios.request({
      url: "https://api.asaas.com/v3/" + path,
      method: method,
      headers: {
        access_token: env.ASAAS_API_KEY,
      },
      data: post ? post : undefined,
    });

    return data.data;
  }

  public async checkRegistrationStatus(): Promise<void> {
    this.logger.log("Checking asaas account registration status.");

    const status = await this.info.getAccountRegistrationStatus();
    const excludedKeys = new Set(["id", "bankAccountInfo"]);

    const hasUnapprovedFields = Object.entries(status).some(
      ([key, value]) => !excludedKeys.has(key) && value !== "APPROVED"
    );

    if (hasUnapprovedFields) {
      const error = "Asaas account not approved for this process.";
      this.logger.log(error);
      throw new Error(error);
    }

    this.logger.log("Asaas account is approved to proceed.");
  }
}

export const Asaas = new AsaasStatic();
