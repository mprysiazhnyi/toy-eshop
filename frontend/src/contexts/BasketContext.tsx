import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

interface BasketItem {
  _id: string;
  [key: string]: any; // other properties can be added as needed
}

interface BasketContextType {
  items: BasketItem[];
  setItems: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  addToBasket: (data: BasketItem, findBasketItem?: BasketItem) => void;
  removeFromBasket: (item_id: string) => void;
  emptyBasket: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

const defaultBasket: BasketItem[] = JSON.parse(
  localStorage.getItem('basket') || '[]'
);

const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<BasketItem[]>(defaultBasket);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(items));
  }, [items]);

  const addToBasket = (data: BasketItem, findBasketItem?: BasketItem) => {
    if (!findBasketItem) {
      return setItems((items) => [data, ...items]);
    }

    const filtered = items.filter((item) => item._id !== findBasketItem._id);
    setItems(filtered);
  };

  const removeFromBasket = (item_id: string) => {
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);
  };

  const emptyBasket = () => setItems([]);

  const values: BasketContextType = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
    emptyBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = (): BasketContextType => {
  const context = useContext(BasketContext);

  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }

  return context;
};

export { BasketProvider, useBasket };
