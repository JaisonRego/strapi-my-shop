import Ajv from "ajv";
import logger from "../../../utils/logger";

const midTransactionSchema = {
  type: "object",
  properties: {
    documentId: { type: "string" },
  },
  required: ["documentId"],
};

const ajv = new Ajv();
const validateMidTransaction = ajv.compile(midTransactionSchema);

export default async function midTransactionValidation(data: any) {
  const valid = validateMidTransaction(data);
  logger.info(validateMidTransaction);

  if (!valid) {
    logger.error("Missing data");

    const errors = validateMidTransaction.errors
      .map((err) => `${err.instancePath || "data"} ${err.message}`)
      .join(", ");
    throw new Error(`Validation failed: ${errors}`);
  }
}
