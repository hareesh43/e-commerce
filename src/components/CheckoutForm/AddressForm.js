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
import { commerce } from "../lib/Commerce";

import FormInput from "./CustomInputField";

export default function AddressForm({ checkoutToken }) {
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

  const fetchShippingContries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingContries(countries);
    setSelectedShippingContry(Object.keys(countries)[0]);
  };

  const fetchSubDivision = async (checkoutTokenId, countryCode) => {
    const { subdivisions } =
      await commerce.services.localeListShippingSubdivisions(
        checkoutTokenId,
        countryCode
      );
    console.log("subdivisions", subdivisions);
    setShippingSubdivitions(subdivisions);
    setSelectedshippingSubdivition(Object.keys(subdivisions)[0]);
  };

  useEffect(() => {
    fetchShippingContries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (selectedShippingContry  )
      fetchSubDivision(checkoutToken.id, selectedShippingContry);
  }, [selectedShippingContry, checkoutToken]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit=" ">
          <Grid container spacing={3} style={{}}>
            <FormInput name="firstName" label="First Name" required />
            <FormInput name="lastName" label="Last Name" required />
            <FormInput name="address1" label="Address" required />
            <FormInput name="email" label="Email" required />
            <FormInput name="zip" label="ZIP / Postal Code" required />
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: "50px" }}>
            <InputLabel>Shipping Country</InputLabel>
            <Select
              value={selectedShippingContry}
              fullWidth
              onChane={(e) => setSelectedShippingContry(e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>

            <InputLabel>Shipping Subdivision</InputLabel>
            <Select
              value={selectedshippingSubdivition}
              fullWidth
              onChane={(e) => setSelectedshippingSubdivition(e.target.value)}
            >
              {subDivisions.map((division) => (
                <MenuItem key={division.id} value={division.id}>
                  {division.label}
                </MenuItem>
              ))}
            </Select>

            {/* {/* <InputLabel>Shipping Options</InputLabel>
            <Select value="" fullWidth onChane="">
              <MenuItem key="" value="">
                Test options
              </MenuItem> 
            </Select> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
}
