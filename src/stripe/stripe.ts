import {Stripe} from "stripe";

export const stripe = new Stripe(
  "sk_test_51Jr7WKKn7FKzA4A5NiFxsmzDP2O8DyWaWIG0HElQs1u9LzbeKgGZcbF2rd89GUdR4TfYR5RIEkOOkjZRLUBIFGtc00lgm4WwM0",
  {
    apiVersion: "2020-08-27",
    typescript: true,
  }
);
