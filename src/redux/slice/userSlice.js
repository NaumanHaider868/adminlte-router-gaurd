import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../pages/services/ApiUrl'

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
    const response = await api.get(`/coupons`);
    // return response.data; // Return the relevant data from the response
    return response.data;
});
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        coupon: [],

    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            console.log(action.payload,'addcase');
            state.data = action.payload;
            state.coupon = action.payload// Set the coupon state with the incoming data
        })
    }
})

export default userSlice.reducer