import preTransactionValidation from "../validators/preTransaction";
import midTransactionValidation from "../validators/midTransaction";
import postTransactionValidation from "../validators/postTransaction";

export default (config, { strapi }) => {
  return async (ctx, next) => {
    try {
      const { path, request } = ctx;

      if (path.includes("pretransaction")) {
        // Pre-transaction validation
        await preTransactionValidation(request.body);
      } else if (path.includes("midtransaction")) {
        // Mid-transaction validation
        await midTransactionValidation(request.body);
      } else if (path.includes("posttransaction")) {
        // Post-transaction validation
        await postTransactionValidation(request.query);
      }

      await next();
    } catch (error) {
      ctx.status = 400; // HTTP status code for bad request
      ctx.body = { error: error.message };
    }
  };
};
