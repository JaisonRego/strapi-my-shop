export default {
  routes: [
    {
      method: "POST",
      path: "/orders/pretransaction",
      handler: "custom.preTransaction",
    },
    {
      method: "POST",
      path: "/orders/midttransaction",
      handler: "custom.midTransaction",
    },
    {
      method: "GET",
      path: "/orders/posttransaction",
      handler: "custom.postTransaction",
    },
  ],
};
