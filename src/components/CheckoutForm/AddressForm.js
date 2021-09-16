import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  InputLabel,
  Grid,
  Menu,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../lib/Commerce";

import FormInput from "./CustomInputField";

export default function AddressForm({ checkoutToken, nextData }) {
  const [shippingContries, setShippingContries] = useState([]);
  const [selectedShippingContry, setSelectedShippingContry] = useState("");
  const [shippingSubdivitions, setShippingSubdivitions] = useState([]);
  const [selectedshippingSubdivition, setSelectedshippingSubdivition] =
    useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState("");

  const methods = useForm();
  const countries = Object.entries(shippingContries).map(([code, country]) => ({
    id: code,
    label: country,
  }));

  const subDivisions = Object.entries(shippingSubdivitions).map(
    ([code, division]) => ({
      id: code,
      label: division,
    })
  );
  const shippingOptionsArray = shippingOptions.map((obj) => ({
    id: obj.id,
    label: `${obj.description} - (${obj.price.formatted_with_symbol})`,
  }));

  const fetchShippingContries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingContries(countries);
    setSelectedShippingContry(Object.keys(countries)[1]);
  };

  const fetchSubDivision = async (checkoutTokenId, countryCode) => {
    const { subdivisions } =
      await commerce.services.localeListShippingSubdivisions(
        checkoutTokenId,
        countryCode
      );
    setShippingSubdivitions(subdivisions);
    setSelectedshippingSubdivition(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country,
        region,
      }
    );
    console.log("options", options);
    setShippingOptions(options);
    setSelectedShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingContries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (selectedShippingContry)
      fetchSubDivision(checkoutToken.id, selectedShippingContry);
  }, [selectedShippingContry, checkoutToken]);

  useEffect(() => {
    if (selectedshippingSubdivition)
      fetchShippingOptions(
        checkoutToken.id,
        selectedShippingContry,
        selectedshippingSubdivition
      );
  }, [selectedshippingSubdivition]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            nextData({
              ...data,
              selectedShippingContry,
              selectedshippingSubdivition,
              selectedShippingOption,
            })
          )}
          className="p-1"
        >
          <Grid container spacing={3} style={{}}>
            <FormInput name="firstName" label="First Name" required />
            <FormInput name="lastName" label="Last Name" required />
            <FormInput name="address1" label="Address" required />
            <FormInput name="email" label="Email" required />
            <FormInput name="city" label="City" required />
            <FormInput name="zip" label="ZIP / Postal Code" required />

            <Grid item xs={12} sm={6}>
              <InputLabel className="p-1">Shipping Country</InputLabel>
              <Select
                value={selectedShippingContry}
                fullWidth
                onChange={(e) => {
                  setSelectedShippingContry(e.target.value);
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel className="p-1">Shipping Subdivision</InputLabel>
              <Select
                value={selectedshippingSubdivition}
                fullWidth
                onChange={(e) => {
                  setSelectedshippingSubdivition(e.target.value);
                }}
              >
                {subDivisions.map((division) => (
                  <MenuItem key={division.id} value={division.id}>
                    {division.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel className="p-1">Shipping Options</InputLabel>
              <Select
                value={selectedShippingOption}
                fullWidth
                onChange={(e) => {
                  setSelectedShippingOption(e.target.value);
                }}
              >
                {shippingOptionsArray.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div className="d-flex justify-content-between">
            <Button
              component={Link}
              to="/cart"
              variant="outlined"
              color="secondary"
            >
              Back to Cart
            </Button>

            <Button type="submit" color="primary" variant="contained">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
