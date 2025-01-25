import React, { FC } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Divider,
  ButtonGroup,
} from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useBasket } from '../contexts/BasketContext';

interface Item {
  _id: string;
  photos: string[];
  title: string;
  createdAt: Date;
  price: number;
}

interface CardsProps {
  item: Item;
}

const Cards: FC<CardsProps> = ({ item }) => {
  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/product/${item._id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="300"
          image={item.photos[0]}
          alt="Product"
          sx={{
            objectFit: 'cover',
            width: '100%',
          }}
        />
        <CardContent>
          {/* Title with truncation */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%', // Ensure it doesn't overflow its container
              display: 'block', // Ensures it takes up the full width
            }}
          >
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(item.createdAt).format('DD/MM/YYYY')}
          </Typography>
          <Typography variant="h5" color="primary">
            {item.price}$
          </Typography>
        </CardContent>
      </Link>
      <Divider />
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          size={'small'}
          variant="contained"
          fullWidth
          color={findBasketItem ? 'error' : 'success'}
          onClick={() => addToBasket(item, findBasketItem)}
        >
          {findBasketItem ? 'Remove from basket' : 'Add to basket'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
