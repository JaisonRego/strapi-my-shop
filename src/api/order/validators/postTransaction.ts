import Ajv from "ajv";
import logger from "../../../utils/logger";

const postTransactionSchema = {
  type: "object",
  properties: {
    documentId: { type: "string" },
  },
  required: ["documentId"],
};

const ajv = new Ajv();
const validatePostTransaction = ajv.compile(postTransactionSchema);

export default async function postTransactionValidation(data: any) {
  const valid = validatePostTransaction(data);
  logger.info(postTransactionValidation);

  if (!valid) {
    logger.error("Missing data");
    const errors = validatePostTransaction.errors
      .map((err) => `${err.instancePath || "data"} ${err.message}`)
      .join(", ");
    throw new Error(`Validation failed: ${errors}`);
  }
}
