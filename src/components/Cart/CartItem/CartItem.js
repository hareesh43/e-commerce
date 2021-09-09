import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";

export default function CartItem({
  item,
  handleUpdateCartQty,
  handleDeleteCart,
}) {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          type="button"
          size="small"
          variant="cantained"
          color="secondary"
          onClick={() => handleDeleteCart(item.id)}
        >
          remove
        </Button>
      </CardActions>
    </Card>
  );
}
