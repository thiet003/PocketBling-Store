import { configureStore } from '@reduxjs/toolkit';
import cartReducer, {loadCartFromSessionStorage} from '../Slice/cartSlice'
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.dispatch(loadCartFromSessionStorage());
export default store;