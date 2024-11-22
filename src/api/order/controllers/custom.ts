import { factories } from "@strapi/strapi";

interface PaytmParams {
  body: {
    requestType: string;
    mid: string;
    websiteName: string;
    orderId: string;
    callbackUrl: string;
    txnAmount: {
      value: string;
      currency: string;
    };
    userInfo: {
      custId: string;
    };
  };
  head?: {
    signature: string;
  };
}

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
      let params = ctx.request.body;
      console.log(params);

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

// Commented-out code for actual Paytm token generation
/*
  export default factories.createCoreController(
    "api::order.order",
    ({ strapi }) => ({
      async preTransaction(ctx) {
        const paytmParams: PaytmParams = {
          body: {
            requestType: "Payment",
            mid: "YOUR_MID_HERE",
            websiteName: "YOUR_WEBSITE_NAME",
            orderId: "ORDERID_98765",
            callbackUrl: "http://localhost:1337/api/orders/posttransaction",
            txnAmount: {
              value: "1.00",
              currency: "INR",
            },
            userInfo: {
              custId: "CUST_001",
            },
          },
        };

        try {
          const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmParams.body),
            "YOUR_MERCHANT_KEY"
          );

          paytmParams.head = {
            signature: checksum,
          };

          const post_data = JSON.stringify(paytmParams);

          const options = {
            hostname: "securegw.stage.paytm.in", // for Production: 'securegw.paytm.in'
            port: 443,
            path: "/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId=ORDERID_98765",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": post_data.length,
            },
          };

          const response = await new Promise<string>((resolve, reject) => {
            const post_req = https.request(options, (post_res) => {
              let responseData = "";

              post_res.on("data", (chunk) => {
                responseData += chunk;
              });

              post_res.on("end", () => {
                resolve(responseData);
              });

              post_res.on("error", (err) => {
                reject(err);
              });
            });

            post_req.write(post_data);
            post_req.end();
          });

          console.log("Response: ", response);
        } catch (error) {
          console.error("Error in transaction: ", error);
          ctx.throw(500, "Internal Server Error");
        }
      },
    })
  );
*/
