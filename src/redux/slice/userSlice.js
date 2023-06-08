import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../pages/services/ApiUrl';

// i call fetch coupon api
export const fetchCoupons = createAsyncThunk('fetchCoupons', async (page) => {
    const response = await api.get(`/coupons?page=${page}`)
    return response.data;
});

// i call delete coupon Api
export const deleteCoupon = createAsyncThunk('deleteCoupon', async (id) => {
    const response = await api.delete(`/coupons/${id}`);
    return response.data;
});

// i call view coupon Api
export const viewCoupon = createAsyncThunk('viewCoupon', async (id) => {
    const response = await api.get(`/coupons/${id}`);
    // console.log(response.data.data.coupon, 'view coupon')
    return response.data.data.coupon;

});

// i call add coupon api
export const postCoupon = createAsyncThunk('postCoupon', async (payload) => {
    try {
        const response = await api.post(`/coupons`, payload);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.errors);
    }
});

// get coupon for editgetForPost
export const getCouponForPost = createAsyncThunk('getCouponForPost', async (id) => {
    const response = await api.get(`/coupons/${id}`);
    return response.data.data.coupon;
});

export const editCoupon = createAsyncThunk('editCoupon', async ({ id, formData }) => {
    try {
        const response = await api.post(`/coupons/${id}`, formData);
        // console.log(response,'edit from slice')
        return response;
    } catch (error) {
        console.log(error)
        return error.response.data.errors
    }
});

// for search coupon
export const searchCoupon = createAsyncThunk('searchCoupon', async ({ search }) => {
    try {
        const response = await api.get(`/coupons?keyword=${search}`);
        console.log(response.data, 'search coupons');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        // data: [], // Initialize as an empty array
        coupon: [],
        // viewCoupon: [],
        error: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        // getCoupons
        builder.addCase(fetchCoupons.fulfilled, (state, action) => {
            // console.log(action.payload, 'addcase');
            // state.data = action.payload;
            state.coupon = action.payload; // Set the coupon state with the incoming data
            state.total = action.payload.total
        });

        // Delete Coupon
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            // console.log(action.payload.messages, 'deletecase');
            state.coupon = action.payload;
        });

        // view Coupon
        builder.addCase(viewCoupon.fulfilled, (state, action) => {
            state.coupon = action.payload;
        });

        // add coupon
        builder.addCase(postCoupon.fulfilled, (state, action) => {
            state.coupon.push(action.payload);
            // console.log(action.payload, 'post in coupon')
        });

        // get for edit coupon
        builder.addCase(getCouponForPost.fulfilled, (state, action) => {
            const couponData = action.payload;
            state.coupon = couponData;
            // console.log(state.viewCoupon, 'getpost coupon')
        });

        builder.addCase(editCoupon.fulfilled, (state, action) => {
            const postedData = action.payload;
            state.coupon = postedData;
            // console.log(action, 'posted data from coupon edit slice');
        });

        builder.addCase(editCoupon.rejected, (state, action) => {
            const errorResponse = action.payload;
            state.error = errorResponse;
            console.log(errorResponse, 'posted data from coupon edit error');
        });

        // search api

        builder.addCase(searchCoupon.fulfilled, (state, action) => {
            const searchData = action.payload;
            state.coupon = searchData;
            console.log(searchData, 'search data from slice');
        });

        builder.addCase(searchCoupon.rejected, (state, action) => {
            state.error = action.error;
          });
    }

})

export default userSlice.reducer