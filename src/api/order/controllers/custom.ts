import { factories } from "@strapi/strapi";
import fs from "fs";
import path from "path";

const getSamplePaytmResponse = () => {
  const filePath = path.join(
    __dirname,
    "../../../../../public/sample_json/sample-paytm-response.json"
  );
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async preTransaction(ctx) {
      try {
        let params = ctx.request.body;

        const existingOrder = await strapi.db
          .query("api::order.order")
          .findOne({
            where: { orderId: params.orderId },
          });

        if (existingOrder) {
          return ctx.throw(
            400,
            `Order with orderId ${params.orderId} already exists.`
          );
        }
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
          params.documentId,
          {
            data: { orderStatus: "Success" },
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
          where: { documentId: params.documentId },
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
