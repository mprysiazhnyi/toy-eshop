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

  if (status === 'loading') return <CircularProgress />;

  if (status === 'error')
    return <Typography>Error: {(error as AxiosError).message}</Typography>;

  if (!data) {
    return <Typography>No data available</Typography>;
  }

  return (
    <div>
      <div className="products">
        <Grid2 gridTemplateColumns="repeat(3,1fr)" gap={4}>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((item) => (
                <Box width="100%" key={item._id}>
                  <Cards item={item} />
                </Box>
              ))}
            </React.Fragment>
          ))}
        </Grid2>
      </div>
      <Box mt={2} display="flex" justifyContent="center">
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
    </div>
  );
};

export default Products;
