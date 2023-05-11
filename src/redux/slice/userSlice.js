import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../pages/services/ApiUrl'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// i call fetch coupon api
export const fetchTodos = createAsyncThunk('fetchTodos', async (page) => {
    const response = await api.get(`/coupons?page=${page}`);
    return response.data;
});

// i call delete coupon Api
export const deleteTodo = createAsyncThunk('deleteTodo', async (id) => {
    const response = await api.delete(`/coupons/${id}`);
    return response.data;
});

// i call view coupon Api
export const viewTodo = createAsyncThunk('viewTodo', async (id) => {
    const response = await api.get(`/coupons/${id}`);
    return response.data;

});

// i call add coupon api
export const postTodo = createAsyncThunk('postTodo', async (payload) => {
    const response = await api.post(`/coupons`, payload);
    return response.data.data.coupon;

});

// get coupon for editgetForPost
export const getForPost = createAsyncThunk('getForPost', async (id) => {
    const response = await api.get(`/coupons/${id}`);
    return response.data.data.coupon;
});

// post coupon after edit
// export const editTodo = createAsyncThunk('editTodo', async (id,formData) => {
//     // const { id, formData } = payload
//     const response = await api.post(`/coupons/${id}`, formData);
//     return response.data.data.coupon;

// });

export const editTodo = createAsyncThunk('editTodo', async ({id,formData}) => {
    console.log(id,'post id')
    const response = await api.post(`/coupons/${id}`, formData);
    return response.data;
});
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        coupon: [],
        viewCoupon: []

    },
    reducers: {},
    extraReducers: (builder) => {
        // getCoupons
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            console.log(action.payload, 'addcase');
            state.data = action.payload;
            state.coupon = action.payload // Set the coupon state with the incoming data
        })

        // Delete Coupon

        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            console.log(action.payload.messages, 'deletecase');
            state.data = action.payload;
        })

        // view Coupon
        builder.addCase(viewTodo.fulfilled, (state, action) => {
            state.coupon = action.payload
        })


        // add coupon
        builder.addCase(postTodo.fulfilled, (state, action) => {
            state.data.push(action.payload)
            // console.log(action.payload, 'post in coupon')
        })

        // get for edit coupon

        builder.addCase(getForPost.fulfilled, (state, action) => {
            const couponData = action.payload;
            state.viewCoupon = couponData;
            // console.log(state.viewCoupon, 'post coupon')
        });

        // update coupon
        // builder.addCase(editTodo.fulfilled, (state, action) => {
        //     state.data.push(action.payload)
        //     console.log(action, 'edit coupon')
        // })

        builder.addCase(editTodo.fulfilled, (state, action) => {
            const postedData = action.payload;
            console.log(postedData, 'posted data');
        });
    }
    
})

export default userSlice.reducer