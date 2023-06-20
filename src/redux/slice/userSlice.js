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
        // console.log(error.response.data.errors);
        return error.response.data.errors
    }
});

// get coupon for editgetForPost
export const getCouponForPost = createAsyncThunk('getCouponForPost', async (id) => {
    const response = await api.get(`/coupons/${id}`);
    return response.data.data.coupon;
});

export const editCoupon = createAsyncThunk('editCoupon', async ({ id, payload }) => {
    try {
        const response = await api.post(`/coupons/${id}`, payload);
        // console.log(response,'edit from slice')
        return response;
    } catch (error) {
        // console.log(error.response.data.errors, 'error')
        return error.response.data.errors
    }
});

// for search coupon

export const searchCoupon = createAsyncThunk('searchCoupon', async (search) => {
    const response = await api.get(`/coupons?keyword=${search}`);
    return response
})

export const handleCloseSearch = createAsyncThunk('handleCloseSearch', async () => {
    const response = await api.get(`/coupons?keyword=${[]}`);
    return response
})


const userSlice = createSlice({
    name: 'user',
    initialState: {
        coupon: [],
        error: null,
        isLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        // getCoupons

        // builder.addCase(fetchCoupons.pending, (state, action) => {
        //     state.error = null;
        //     state.isLoading = true
        // });

        builder.addCase(fetchCoupons.pending, (state, action) => {
            // state.isLoading = false;
            state.error = null;
            state.isLoading = true
        });

        builder.addCase(fetchCoupons.fulfilled, (state, action) => {
            // state.isLoading = false;
            state.error = null;
            state.coupon = action.payload;
            state.total = action.payload.total;
            state.isLoading=false
        });


        // Delete Coupon
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.error = null;
            state.coupon = action.payload;
        });

        // view Coupon
        builder.addCase(viewCoupon.fulfilled, (state, action) => {
            state.error = null;
            state.coupon = action.payload;
        });

        // add coupon
        builder.addCase(postCoupon.fulfilled, (state, action) => {
            state.error = null;
            state.coupon = action.payload
        });

        builder.addCase(postCoupon.rejected, (state, action) => {
            state.coupon = null;
            state.error = action.payload
        })

        // get for edit coupon
        builder.addCase(getCouponForPost.fulfilled, (state, action) => {
            state.error = null;
            const couponData = action.payload;
            state.coupon = couponData;
        });

        builder.addCase(editCoupon.fulfilled, (state, action) => {
            state.error = null;
            const postedData = action.payload;
            state.coupon = postedData;
        });

        builder.addCase(editCoupon.rejected, (state, action) => {
            state.coupon = null;
            const errorResponse = action.payload;
            state.error = errorResponse;
            // console.log(state.error,'state.error')
        });

        // search api

        builder.addCase(searchCoupon.fulfilled, (state, action) => {
            state.item = action.payload;
            state.error = null;
        })

        builder.addCase(handleCloseSearch.fulfilled, (state, action) => {
            state.item = action.payload;
            state.error = null;
        })
    }

})

export default userSlice.reducer