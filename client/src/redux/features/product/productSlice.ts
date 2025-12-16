import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  data: {
    id: number;
    name: string;
    images: string;
    description?: string;
    price: string | number;
    discount?: string | number;
    categoryId?: string | number;
    brandId?: string | number;
    deletedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
    category?: any;
    brand?: any;
  };
  cart_count: number;
}
interface ProductState {
  productCart: Product[];
}
const initialState: ProductState = {
  productCart: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storeCart: (state, action: PayloadAction<Product>) => {
      state.productCart.push(action.payload);
    },
    addProductToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProductIndex = state.productCart.findIndex(
        (p) => p.data.id === product.data.id
      );

      if (existingProductIndex !== -1) {
        // Product already in cart, increase count
        state.productCart[existingProductIndex].cart_count += 1;
      } else {
        // Add new product to cart
        state.productCart.push({ ...product, cart_count: 1 });
      }
    },
    increaseProductCount: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.productCart.find((p) => p.data.id === productId);

      if (product) {
        product.cart_count += 1;
      }
    },
    decreaseProductCount: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.productCart.find((p) => p.data.id === productId);

      if (product && product.cart_count > 1) {
        product.cart_count -= 1;
      } else if (product && product.cart_count === 1) {
        // Remove product from cart if count reaches 0
        state.productCart = state.productCart.filter(
          (p) => p.data.id !== productId
        );
      }
    },
    removeProductInCart: (state, action) => {
      const newCartProducts = state.productCart?.filter(
        (product: any) => product?.data?.id !== action.payload
      );
      state.productCart = newCartProducts;
    },
  },
});

// Selector for getting subtotal for a particular product
export const selectSubtotalPrice = (product: Product) => {
  const price =
    typeof product.data.price === "string"
      ? parseFloat(product.data.price)
      : product.data.price;

  return price * product.cart_count;
};

// Selector for getting the total price of the cart using map
export const selectTotalPrice = (state: { product: ProductState }) => {
  // Step 1: Use map to transform the productCart array to an array of subtotals
  const subtotals = state.product.productCart.map((product) => {
    const price =
      typeof product.data.price === "string"
        ? parseFloat(product.data.price)
        : product.data.price;

    return price * product.cart_count;
  });

  // Step 2: Use reduce to calculate the total price from the subtotals array
  const totalPrice = subtotals.reduce((total, subtotal) => total + subtotal, 0);
  return totalPrice;
};

// Action creators are generated for each case reducer function
export const {
  storeCart,
  removeProductInCart,
  increaseProductCount,
  decreaseProductCount,
} = productSlice.actions;

export default productSlice.reducer;
