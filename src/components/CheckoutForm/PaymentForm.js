import React from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Typography, Divider, Button } from "@material-ui/core";
import Review from "./Review";

const stripePromise = loadStripe(
  "..."
);

export default function PaymentForm({ checkoutToken,backStep }) {
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography varian="h3" gutterBottom>
        Payment Details
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form>
              <CardElement />
              <br />
              <br />
              <div className="d-flex justify-content-between">
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  onClick={backStep}
                  color = 'primary'
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
}
