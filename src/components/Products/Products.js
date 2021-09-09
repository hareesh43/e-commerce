import React from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";

import useStyles from "./styles";

export default function Products({ products, handleAddToCart }) {
  const classes = useStyles();
  console.log(products);
  // return <div>Test</div>;

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} handleAddToCart ={handleAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
