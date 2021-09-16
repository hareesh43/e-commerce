import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";

export default function Review({ checkoutToken }) {
  console.log("token", checkoutToken);
  return (
    <>
      <Typography gutterBottom variant="h6">
        Order Summary
      </Typography>
      <List disablePadding>
        {checkoutToken &&
          checkoutToken.live.line_items.map((product) => (
            <ListItem className="p-1">
              <ListItemText
                primary={product.product_name}
                secondary={`Quantity : ${product.quantity}`}
              />
              <Typography variant="body2">
                {product.line_total.formatted_with_symbol}
              </Typography>
            </ListItem>
          ))}
        <Divider variant="middle"  color = "primary"/>
        <ListItem className="p-1">
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style = {{fontWeight:700}} >
            {checkoutToken && checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
