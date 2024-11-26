module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders/pretransaction",
      handler: "custom.preTransaction",
      config: {
        middlewares: ["api::order.transaction-validator"],
      },
    },
    {
      method: "POST",
      path: "/orders/midtransaction",
      handler: "custom.midTransaction",
      config: {
        middlewares: ["api::order.transaction-validator"],
      },
    },
    {
      method: "GET",
      path: "/orders/posttransaction",
      handler: "custom.postTransaction",
      config: {
        middlewares: ["api::order.transaction-validator"],
      },
    },
  ],
};
