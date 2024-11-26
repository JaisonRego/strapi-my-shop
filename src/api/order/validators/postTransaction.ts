import Ajv from "ajv";

const postTransactionSchema = {
  type: "object",
  properties: {
    orderId: { type: "string" },
    transactionId: { type: "string" },
    finalAmount: { type: "number" },
    status: { type: "string" },
  },
  required: ["orderId", "transactionId", "finalAmount", "status"],
};

const ajv = new Ajv();
const validatePostTransaction = ajv.compile(postTransactionSchema);

export default async function postTransactionValidation(data: any) {
  const valid = validatePostTransaction(data);
  if (!valid) {
    throw new Error(`Validation failed: ${validatePostTransaction.errors}`);
  }
}
