import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from "../../services/stripe";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession();

    const stripeCutomer = stripe.customers.create({
      email: session.user.email,
      // metadata
    });

    const stripeCheckouSession = await stripe.checkout.sessions.create({
      customer: (await stripeCutomer).id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: "price_1K2cGTKtsYIO6gndp9SCWosk", quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ sessionId: stripeCheckouSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
