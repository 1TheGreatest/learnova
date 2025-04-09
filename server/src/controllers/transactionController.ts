import Stripe from "stripe";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is required but was not found in env variables"
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); //Initialize Stripe

export const createStripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { amount } = req.body;

  if (!amount || amount <= 0) {
    amount = 50; // Stripe has a minimum of 50 cents
  }

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.status(200).json({
      message: "",
      data: {
        clientSecret: paymentIntent.client_secret, // This is the client secret you will use to confirm the payment on the client side
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating stripe payment intent", error });
  }
};
