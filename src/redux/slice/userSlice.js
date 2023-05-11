import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../pages/services/ApiUrl'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
    const response = await api.get(`/coupons`);
    // return response.data; // Return the relevant data from the response
    return response.data;
});
export const deleteTodo = createAsyncThunk('deleteTodo', async (id) => {
    const response = await api.delete(`/coupons/${id}`);
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
        // getCoupons
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            console.log(action.payload,'addcase');
            state.data = action.payload;
            state.coupon = action.payload// Set the coupon state with the incoming data
        })

        // Delete Coupon

        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            console.log(action.payload.messages,'deletecase');
            // toast.success(action.payload.messages[0])
            state.data = action.payload;
            // fetchTodos();
            // state.data = state.data.filter(todo => todo.id !== deleteTodo.id);
            // state.coupon = action.payload// Set the coupon state with the incoming data
        })

    }
})

export default userSlice.reducer