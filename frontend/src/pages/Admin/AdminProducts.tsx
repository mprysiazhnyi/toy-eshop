import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProductList, deleteProduct } from '../../api';
import { DataGrid } from '@mui/x-data-grid';
import { AxiosError } from 'axios';
import Popconfirm from 'antd/es/popconfirm';

interface Product {
  _id: string;
  title: string;
  price: number;
  createdAt: string;
}

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
              color="primary"
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
              <Button color="secondary" style={{ marginLeft: 8 }}>
                Delete
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, [deleteMutation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as AxiosError).message}</div>;
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>

      <Box mt={10}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          mb={4}
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

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data || []}
            columns={columns}
            pageSize={5}
            rowHeight={60}
          />
        </div>
      </Box>
    </div>
  );
};

export default AdminProducts;
