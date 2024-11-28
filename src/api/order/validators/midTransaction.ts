import Ajv from "ajv";

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
  if (!valid) {
    const errors = validateMidTransaction.errors
      .map((err) => `${err.instancePath || "data"} ${err.message}`)
      .join(", ");
    throw new Error(`Validation failed: ${errors}`);
  }
}
