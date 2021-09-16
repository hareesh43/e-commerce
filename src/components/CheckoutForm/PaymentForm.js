import React from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Typography, Divider, Button } from "@material-ui/core";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRAPI_API_KEY);

export default function PaymentForm({
  checkoutToken,
  backStep,
  shippingData,
  onCaptureCheckout,
  nextStep,
}) {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(Elements);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstname,
          lastname: shippingData.lastname,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          city: shippingData.city,
          state: shippingData.selectedshippingSubdivition,
          zipcode: shippingData.zip,
          country: shippingData.selectedShippingContry,
        },
        fulfillment: { shipping_method: shippingData.selectedShippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

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
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement className="StripeElement" />
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
                  color="primary"
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
