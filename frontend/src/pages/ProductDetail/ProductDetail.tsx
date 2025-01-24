import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchProduct } from '../../api';
import { Carousel } from 'react-responsive-carousel';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { useBasket } from '../../contexts/BasketContext';
import { Loading } from '../../components/Loading';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  photos: string[];
}

interface BasketItem {
  _id: string;
}

function ProductDetail() {
  const { product_id = '' } = useParams<{ product_id: string }>();
  const { addToBasket, items } = useBasket();
  const { isLoading, isError, data } = useQuery(['product', product_id], () =>
    fetchProduct(product_id)
  );

  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const findBasketItem = items.find(
    (item: BasketItem) => item._id === product_id
  );
  const images = data.photos.map((url) => ({ original: url }));

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          maxWidth: '1200px',
          width: '100%',
          height: 'auto',
          background: 'white', // Cozy light gradient background
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
          padding: 2,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            width: { xs: '100%' },
            position: 'relative',
            //background: 'linear-gradient(135deg, #f4f1e1, #c9c5b5)',
            backgroundImage: "url('../assets/bg.jpg')",
            //background: '#c9c5b5', // Subtle gradient with a muted darker beige tone
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.4)', // A subtle shadow to lift the image container
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Carousel
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay
            onClickItem={handleImageClick}
            selectedItem={currentImage}
            emulateTouch
            swipeable
            dynamicHeight
            stopOnHover
            interval={5000}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  //                  background: '#edece5', // Cozy beige transition with a touch of deeper warm beige
                  background: 'linear-gradient(135deg, #f4f1e1, #edece5)', // Cozy beige transition with a touch of deeper warm beige
                }}
              >
                <img
                  src={image.original}
                  alt={`Product Image ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain', // Maintain image size and aspect ratio
                    maxHeight: '500px',
                    cursor: 'pointer', // Soft shadow for depth
                  }}
                />
              </Box>
            ))}
          </Carousel>

          {/* Lightbox (Optional) */}
          {isLightboxOpen && (
            <div
              className="lightbox"
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
              }}
            >
              <img
                src={images[currentImage].original}
                alt={`Product Image ${currentImage + 1}`}
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  cursor: 'pointer',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
        </Box>

        <Stack
          sx={{
            flex: 1,
            marginLeft: { sm: 2 },
            display: 'flex',
            justifyContent: 'center',
            minWidth: '300px',
            maxWidth: '600px',
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                marginBottom: 2,
              }}
            >
              {data.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                paddingY: 2,
                flexGrow: 1,
                fontSize: '1rem',
                lineHeight: 1.5,
              }}
            >
              {data.description}
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {data.price}$
            </Typography>
          </CardContent>

          <CardActions sx={{ padding: 2 }}>
            <Button
              variant="contained"
              color={findBasketItem ? 'error' : 'success'}
              onClick={() => addToBasket(data, findBasketItem)}
              fullWidth
              sx={{
                backgroundColor: findBasketItem ? '#f44336' : '#4caf50',
                '&:hover': {
                  backgroundColor: findBasketItem ? '#d32f2f' : '#388e3c',
                },
              }}
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
