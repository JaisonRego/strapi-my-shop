import Ajv from "ajv";

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
  if (!valid) {
    const errors = validatePostTransaction.errors
      .map((err) => `${err.instancePath || "data"} ${err.message}`)
      .join(", ");
    throw new Error(`Validation failed: ${errors}`);
  }
}
