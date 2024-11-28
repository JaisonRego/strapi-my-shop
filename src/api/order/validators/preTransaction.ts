import Ajv from "ajv";
import ajvFormats from "ajv-formats"; // Import ajv-formats
import logger from "../../../utils/logger";

const preTransactionSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    orderId: { type: "string" },
    paymentInfo: {
      type: "object",
      properties: {
        transactionId: { type: "string" },
        amount: { type: "number" },
      },
      required: ["transactionId", "amount"],
    },
    products: {
      type: "array",
      items: { type: "object" },
    },
    address: {
      type: "object",
      properties: {
        billingAddress: { type: "string" },
        shippingAddress: { type: "string" },
      },
      required: ["billingAddress", "shippingAddress"],
    },
    name: { type: "string" },
    orderStatus: { type: "string" },
  },
  required: [
    "email",
    "orderId",
    "paymentInfo",
    "products",
    "address",
    "name",
    "orderStatus",
  ],
};

const ajv = new Ajv();
ajvFormats(ajv); // Add formats support to Ajv
const validatePreTransaction = ajv.compile(preTransactionSchema);

export default async function preTransactionValidation(data: any) {
  const valid = validatePreTransaction(data);
  logger.info(preTransactionValidation);

  if (!valid) {
    logger.error("Missing data");
    const errors = validatePreTransaction.errors
      .map((err) => `${err.instancePath || "data"} ${err.message}`)
      .join(", ");
    throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
  }
}
