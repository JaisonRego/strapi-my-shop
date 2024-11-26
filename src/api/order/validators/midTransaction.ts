import Ajv from "ajv";

const midTransactionSchema = {
  type: "object",
  properties: {
    orderId: { type: "string" },
    transactionId: { type: "string" },
    paymentStatus: { type: "string" },
  },
  required: ["orderId", "transactionId", "paymentStatus"],
};

const ajv = new Ajv();
const validateMidTransaction = ajv.compile(midTransactionSchema);

export default async function midTransactionValidation(data: any) {
  const valid = validateMidTransaction(data);
  if (!valid) {
    throw new Error(`Validation failed: ${validateMidTransaction.errors}`);
  }
}
