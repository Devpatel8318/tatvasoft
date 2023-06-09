import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    numberOfItems: 0,
    details: [],
    total: 0,
};

export const updateCart = createAsyncThunk('cart/updateCart', async (userRedux) => {
    console.log("updateCart");
    const response = await axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${userRedux}`);
    return response.data.result;
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ id, userRedux }) => {
    console.log(id, userRedux);
    const response = await axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${userRedux}`);
    const cartsArray = response.data.result;
    let isBookExist = 0;
    for (let i = 0; i < cartsArray.length; i++) {
        if (cartsArray[i].bookId === id) {
            isBookExist = 1;
            break;
        }
    }
    if (isBookExist === 0) {
        const data = {
            bookId: id,
            userId: userRedux,
            quantity: 1,
        };
        await axios.post(`https://book-e-sell-node-api.vercel.app/api/cart`, data);
        const updatedResponse = await axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${userRedux}`);
        console.log("HHHHHHHHHHHHHH", updatedResponse.data.result);
        updateCart();
        return updatedResponse.data.result;
    }
});

export const increaseAmount = createAsyncThunk('cart/increaseAmount', async ({ cartid, bookid, quantity, userRedux }) => {
    const data = {
        id: cartid,
        bookId: bookid,
        userId: userRedux,
        quantity: quantity + 1,
    };
    await axios.put(`https://book-e-sell-node-api.vercel.app/api/cart`, data);
    const response = await axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${userRedux}`);
    return response.data.result;
});

export const decreaseAmount = createAsyncThunk('cart/decreaseAmount', async ({ cartid, bookid, quantity, userRedux }) => {
    if (quantity > 1) {
        const data = {
            id: cartid,
            bookId: bookid,
            userId: userRedux,
            quantity: quantity - 1,
        };
        await axios.put(`https://book-e-sell-node-api.vercel.app/api/cart`, data);
        const response = await axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${userRedux}`);
        return response.data.result;
    } else {
        return [];
    }
});

export const removeBook = createAsyncThunk('cart/removeBook', async ({ cartId, userRedux }) => {
    await axios.delete(`https://book-e-sell-node-api.vercel.app/api/cart?id=${cartId}`);
    const response = await axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${userRedux}`);
    return response.data.result;
});

export const placeOrder = createAsyncThunk('cart/placeOrder', async ({ numberOfItems, details, userRedux }) => {
    console.log(numberOfItems, details, userRedux);
    if (numberOfItems > 0) {
        let cartIds = [];
        for (let i = 0; i < details.length; i++) {
            cartIds.push(details[i].id);
        }
        const data = {
            userId: userRedux,
            cartIds,
        };
        await axios.post(`https://book-e-sell-node-api.vercel.app/api/order`, data);
        return [];
    } else {
        alert("Cart Empty");
        return [];
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateCart.fulfilled, (state, action) => {
                state.numberOfItems = action.payload.length;
                state.details = action.payload;
                state.total = updateTotal(action.payload);
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.numberOfItems = action.payload.length;
                state.details = action.payload;
                state.total = updateTotal(action.payload);

            })
            .addCase(increaseAmount.fulfilled, (state, action) => {
                state.numberOfItems = action.payload.length;
                state.details = action.payload;
                state.total = updateTotal(action.payload);

            })
            .addCase(decreaseAmount.fulfilled, (state, action) => {
                state.numberOfItems = action.payload.length;
                state.details = action.payload;
                state.total = updateTotal(action.payload);

            })
            .addCase(removeBook.fulfilled, (state, action) => {
                state.numberOfItems = action.payload.length;
                state.details = action.payload;
                state.total = updateTotal(action.payload);
            })
            .addCase(placeOrder.fulfilled, (state) => {
                state.total = 0;
                state.numberOfItems = 0;
                state.details = [];
            });
    },
});

function updateTotal(details) {
    let temp = 0;
    if (details?.length > 0) {
        for (let i = 0; i < details.length; i++) {
            temp += details[i].quantity * details[i].book.price;
        }
        console.log('====================================');
        console.log(temp);
        console.log('====================================');
        return temp;
    }
}
export default cartSlice.reducer;
