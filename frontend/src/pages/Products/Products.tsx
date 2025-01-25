import React from 'react';
import Cards from '../../components/Card';
import {
  Grid2,
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useInfiniteQuery } from 'react-query';
import { fetchProductList, FetchProductListResponse } from '../../api';
import { AxiosError } from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { Loading } from '../../components/Loading';

const Products = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('products', fetchProductList, {
    getNextPageParam: (lastGroup, allGroups): number | undefined => {
      const morePagesExist = lastGroup?.length === 12;

      if (!morePagesExist) {
        return undefined;
      } else {
        return (allGroups.length || 0) + 1;
      }
    },
  });

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error')
    return <Typography>Error: {(error as AxiosError).message}</Typography>;

  if (!data) {
    return <Typography>No data available</Typography>;
  }

  const images = [
    { original: '/assets/banner.jpg' },
    { original: '/assets/banner2.jpg' },
  ];
  return (
    <Box>
      <Box
        mt={-2}
        ml={-2}
        mr={-2}
        sx={{
          userSelect: 'none', // Disable text/image selection
        }}
      >
        <Carousel
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          emulateTouch
          swipeable
          dynamicHeight
          stopOnHover
          interval={5000}
          showThumbs={false}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                //                  background: '#edece5', // Cozy beige transition with a touch of deeper warm beige
                //background: 'linear-gradient(135deg, #f4f1e1, #edece5)', // Cozy beige transition with a touch of deeper warm beige
                backgroundImage: "url('/assets/bg.jpg')",
              }}
            >
              <img
                src={image.original}
                alt={`Banner Image ${index + 1}`}
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
      </Box>
      <Box
        mt={4}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid2 container spacing={4} justifyContent="center">
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((item) => (
                <Grid2
                  key={item._id}
                  sx={{
                    width: {
                      xs: '100%', // Full width on extra small screens
                      sm: '50%', // Half width on small screens
                      md: '33.33%', // One-third width on medium screens
                      lg: '25%', // One-fourth width on large screens
                    },
                    display: 'flex',
                    justifyContent: 'center', // Centering the card inside the grid item
                  }}
                >
                  <Box
                    sx={{
                      border: '1px solid #ddd', // Light border color
                      borderRadius: '12px', // Rounded corners
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow
                      overflow: 'hidden', // Ensures no content overflows the card
                      transition: 'transform 0.3s ease-in-out', // Smooth hover effect
                      '&:hover': {
                        transform: 'scale(1.05)', // Slightly enlarge on hover
                      },
                      width: '100%',
                      maxWidth: '345px',
                    }}
                  >
                    <Cards item={item} />
                  </Box>
                </Grid2>
              ))}
            </React.Fragment>
          ))}
        </Grid2>
      </Box>
      <Box mt={3} mb={1} display="flex" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          variant="contained"
          color="primary"
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Button>
      </Box>
    </Box>
  );
};

export default Products;
