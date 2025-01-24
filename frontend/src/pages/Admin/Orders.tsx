import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../../api.js';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import { Nav } from './Nav';
import { Loading } from '../../components/Loading';

interface OrderItem {
  _id: string;
  user: { email: string } | null;
  adress: string;
  items: any[];
}

const Orders: FC = () => {
  const { isLoading, isError, data, error } = useQuery(
    'admin:orders',
    fetchOrders
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error {(error as AxiosError).message}</div>;
  }

  return (
    <div>
      <Nav />

      <div>
        <Typography variant="h5" gutterBottom>
          Orders
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Items</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item: OrderItem) => (
                <TableRow key={item._id}>
                  <TableCell>
                    {item.user === null ? 'No Name' : item.user.email}
                  </TableCell>
                  <TableCell>{item.adress}</TableCell>
                  <TableCell align="right">{item.items.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Orders;
