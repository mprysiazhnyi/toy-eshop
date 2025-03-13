import React from 'react';
import { Grid2, Box, Button, Typography } from '@mui/material';
import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { fetchProductList } from '../api';
import { Loading } from './Loading';
import Cards from './Card';

const Products = ({
  infinite = true,
  limit,
  itemsPerRow = 3,
}: {
  infinite?: boolean;
  limit?: number;
  itemsPerRow?: number;
}) => {
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

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        mt={4}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid2 container spacing={4} justifyContent="center" width={'100%'}>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {(limit ? group.slice(0, limit) : group).map((item) => (
                <Grid2
                  key={item._id}
                  sx={{
                    width: {
                      xs: `100%`, // Full width on extra small screens
                      sm: `${100 / (itemsPerRow - 1)}%`, // Half width on small screens
                      md: `${100 / itemsPerRow}%`, // One-third width on medium screens
                      lg: `${100 / (itemsPerRow + 1)}%`, // One-fourth width on large screens
                    },
                    display: 'flex',
                    justifyContent: 'center', // Centering the card inside the grid item
                  }}
                >
                  <Box
                    sx={{
                      border: '1px solid #ddd', // Light border color
                      borderRadius: '31px', // Rounded corners
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
      {infinite && (
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
      )}
      {!infinite && <Box height={40}></Box>}
    </Box>
  );
};

export default Products;
