import React from "react";
import { Typography, Grid, Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

export default function Cart({
  cart,
  handleUpdateCartQty,
  handleDeleteCart,
  handleEmptyCart,
}) {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle2">
      You have no item in the cart
      <Link to="/" className={classes.link}>
        {" "}
        start adding some !!
      </Link>{" "}
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart &&
          cart.line_items.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <CartItem
                item={item}
                handleUpdateCartQty={handleUpdateCartQty}
                handleDeleteCart={handleDeleteCart}
              />
            </Grid>
          ))}
      </Grid>
      <div className={classes.cartDEtails}>
        <Typography variant="h4">
          Sub Total : {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => handleEmptyCart()}
          >
            Empty Cart
          </Button>

          <Button
            className={classes.checkout}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "Loading ...";
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography variant="h3" className={classes.title} gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}
