import React from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";


const products = [
  {
    id: 2,
    name: "test",
    price: "$1",
    description: "test description",
    image: "https://hackernoon.com/hn-images/0*xMaFF2hSXpf_kIfG.jpg",
  },
  {
    id: 1,
    name: "test",
    price: "$1",
    description: "running shpoes",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cushion-shoes-7659-1584132587.jpg",
  },
  {
    id: 3,
    name: "test",
    price: "$1",
    description: "macbook ",
    image:
      "https://www.zdnet.com/a/hub/i/r/2020/11/16/37e33024-2892-4bb7-9d21-6ac6f7544def/resize/1200x900/df40c8ba0096e1a62c5879c1d42d069f/apple-macbook-pro-m1-2020-5.jpg",
  },
];
export default function Products() {
  return (
    <div>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
