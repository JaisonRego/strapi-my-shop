import { factories } from "@strapi/strapi";

const getSamplePaytmResponse = () => ({
  documentId: null,
  head: {
    responseTimestamp: "1665678901234",
    version: "v1",
    signature: "b8XyZf6nW4+jh8AqR2Ys1Zk3X+E=",
  },
  body: {
    resultInfo: {
      resultStatus: "S",
      resultCode: "0000",
      resultMsg: "Success",
    },
    txnToken: "e9aa1ddc-0f93-11ec-82a8-0242ac130003",
    isPromoCodeValid: false,
    authenticated: true,
  },
});

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async preTransaction(ctx) {
      try {
        let params = ctx.request.body;

        const entry = await strapi.entityService.create("api::order.order", {
          data: {
            email: params.email,
            orderId: params.orderId,
            paymentInfo: params.paymentInfo,
            transactionId: params.paymentInfo.transactionId,
            products: Array.isArray(params.products) ? params.products : [],
            billingAddress: params.address.billingAddress || "",
            shippingAddress: params.address.shippingAddress || "",
            name: params.name || "",
            amount: typeof params.amount === "number" ? params.amount : 0,
            orderStatus: params.orderStatus || "Pending",
          },
        });

        const sampleResponse = getSamplePaytmResponse();
        sampleResponse.documentId = entry.documentId;

        return sampleResponse;
      } catch (error) {
        ctx.throw(500, error);
      }
    },

    async midTransaction(ctx) {
      try {
        let params = ctx.request.body;

        const updatedOrder = await strapi.entityService.update(
          "api::order.order",
          params.orderId,
          {
            data: {
              orderStatus: "Success",
            },
          }
        );

        if (updatedOrder) {
          return ctx.send({
            success: true,
            message: "Order status updated successfully.",
            order: updatedOrder,
          });
        } else {
          return ctx.throw(404, "Order not found.");
        }
      } catch (error) {
        ctx.throw(500, error);
      }
    },

    async postTransaction(ctx) {
      try {
        let params = ctx.query;

        const order = await strapi.db.query("api::order.order").findOne({
          where: {
            documentId: params.documentId,
          },
        });

        if (order) {
          return ctx.send({
            success: true,
            message: "Order found successfully.",
            order: order,
          });
        } else {
          return ctx.throw(404, "Order with specified DocumentID not found.");
        }
      } catch (error) {
        ctx.throw(500, error);
      }
    },
  })
);
