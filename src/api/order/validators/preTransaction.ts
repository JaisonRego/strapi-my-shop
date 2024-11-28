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
        paymentMethod: { type: "string" },
        transactionId: { type: "string" },
      },
      required: ["paymentMethod", "transactionId"],
    },
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          productId: { type: "string" },
          productName: { type: "string" },
          quantity: { type: "number", minimum: 1 },
          price: { type: "number", minimum: 0 },
        },
        required: ["productId", "productName", "quantity", "price"],
      },
      minItems: 1,
    },
    address: {
      type: "object",
      properties: {
        shippingAddress: { type: "string" },
        billingAddress: { type: "string" },
      },
      required: ["shippingAddress", "billingAddress"],
    },
    name: { type: "string" },
    transactionId: { type: "string" },
    amount: { type: "number", minimum: 0 },
    orderStatus: { type: "string", enum: ["Pending", "Success", "Failed"] },
  },
  required: [
    "email",
    "orderId",
    "paymentInfo",
    "products",
    "address",
    "name",
    "transactionId",
    "amount",
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
