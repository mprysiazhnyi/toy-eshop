import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchProduct } from '../../api';
import ImageGallery from 'react-image-gallery';

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { useBasket } from '../../contexts/BasketContext';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  photos: string[];
}

function ProductDetail() {
  const { product_id = '' } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(['product', product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <Box sx={{ padding: 2 }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          overflow: 'hidden',
        }}
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          <ImageGallery items={images} showThumbnails={false} />
        </Box>

        <Stack sx={{ flex: 1, marginLeft: { sm: 2 } }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {data.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 400, paddingY: 2 }}
            >
              {data.description}
            </Typography>
            <Typography variant="h5" color="primary">
              {data.price}$
            </Typography>
          </CardContent>

          <CardActions>
            <Button
              variant="contained"
              color={findBasketItem ? 'error' : 'success'}
              onClick={() => addToBasket(data, findBasketItem)}
            >
              {findBasketItem ? 'Remove from basket' : 'Add to Basket'}
            </Button>
          </CardActions>
        </Stack>
      </Card>
    </Box>
  );
}

export default ProductDetail;
