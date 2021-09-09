import React, { useEffect, useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import { commerce } from "../../lib/Commerce";

import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { SignalCellularNullOutlined } from "@material-ui/icons";

const steps = ["Shipping Address", "Payment Details"];

export default function Checkout({ cart }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const classes = useStyles();

  const generateCheckoutToken = async (cart) => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      setCheckoutToken(token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generateCheckoutToken(cart);
  }, [cart]);

  const ConformationForm = () => <div>Conformation</div>;

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );

  return (
    <>
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <ConformationForm />
            ) : (
              checkoutToken && <Form />
            )}
          </Paper>
        </main>
      </div>
    </>
  );
}
