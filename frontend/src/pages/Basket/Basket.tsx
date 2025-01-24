import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  TextareaAutosize,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { useBasket } from '../../contexts/BasketContext';
import { postOrder } from '../../api';

function Basket() {
  const [address, setAddress] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const initialRef = useRef<HTMLTextAreaElement | null>(null);

  const { items, removeFromBasket, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    await postOrder(input);

    emptyBasket();
    setIsModalOpen(false); // Close the modal after submitting the order
  };

  return (
    <Box>
      {items.length < 1 && (
        <Alert severity="warning">
          <AlertTitle>No items in your basket</AlertTitle>
          You have not any items in your basket.
        </Alert>
      )}
      {items.length > 0 && (
        <>
          <ImageList cols={4} gap={16}>
            {items.map((item) => (
              <ImageListItem key={item._id}>
                <Link to={`/product/${item._id}`}>
                  <Typography variant="h6" fontWeight={600} mb={1}>
                    {item.title} - {item.price} $
                  </Typography>
                  <img
                    src={item.photos[0]}
                    alt="basket item"
                    width="100%"
                    height="250px"
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </Link>
                <Button
                  onClick={() => removeFromBasket(item._id)}
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Remove from Basket
                </Button>
              </ImageListItem>
            ))}
          </ImageList>
          <Box mt={2}>
            <Typography variant="h6">Total: {total}$</Typography>
          </Box>

          <Button
            onClick={() => setIsModalOpen(true)}
            color="primary"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Buy now
          </Button>

          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DialogTitle>Create your order</DialogTitle>
            <DialogContent>
              <FormControl fullWidth margin="normal">
                <FormLabel>Address</FormLabel>
                <TextareaAutosize
                  ref={initialRef}
                  minRows={3}
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmitForm}
              >
                Submit
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}

export default Basket;
