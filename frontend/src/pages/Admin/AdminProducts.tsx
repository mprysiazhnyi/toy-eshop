import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProductList, deleteProduct } from '../../api';
import { DataGrid } from '@mui/x-data-grid';
import { AxiosError } from 'axios';
import Popconfirm from 'antd/es/popconfirm';
import { Nav } from './Nav';
import { Loading } from '../../components/Loading';

const AdminProducts: FC = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data = [],
    error,
  } = useQuery('admin:products', fetchProductList);

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries('admin:products'),
  });

  const columns = useMemo(() => {
    return [
      {
        field: 'title',
        headerName: 'Title',
        width: 200,
      },
      {
        field: 'price',
        headerName: 'Price',
        width: 150,
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 200,
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 250,
        renderCell: (params: any) => (
          <>
            <Button
              variant={'contained'}
              component={Link}
              to={`/admin/products/${params.row._id}`}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                deleteMutation.mutate(params.row._id);
                alert('Product deleted');
              }}
              onCancel={() => console.log('Cancelled')}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Button
                variant={'contained'}
                color="error"
                style={{ marginLeft: 8 }}
              >
                Delete
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, [deleteMutation]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error: {(error as AxiosError).message}</div>;
  }

  return (
    <div>
      <Nav />

      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5">Products</Typography>

          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/admin/products/new"
          >
            New
          </Button>
        </Box>

        <div style={{ height: 'auto', width: '100%' }}>
          <DataGrid
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            rows={data.map((d) => ({ ...d, id: d._id })) || []}
            columns={columns}
            pageSizeOptions={[5]}
            rowHeight={60}
          />
        </div>
      </Box>
    </div>
  );
};

export default AdminProducts;
