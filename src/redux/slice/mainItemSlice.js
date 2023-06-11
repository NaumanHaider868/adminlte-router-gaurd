import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../pages/services/ApiUrl';


export const getItem = createAsyncThunk('getItem', async () => {
    const response = await api.get(`/items`);
    return response
});

export const handlePage = createAsyncThunk('handlePage', async (page) => {
    const response = await api.get(`/items?page=${page}`);
    return response
});

export const handleSearch = createAsyncThunk('handleSearch', async (search) => {
    const response = await api.get(`/items?keyword=${search}`);
    return response
})

export const handleCloseSearch = createAsyncThunk('handleCloseSearch', async () => {
    const response = await api.get(`/items?keyword=${[]}`);
    return response
})


// Code For Post Data In Items

export const postItem = createAsyncThunk('postItem', async (formData) => {
    try {
        const response = await api.post('/items', formData);
        return response
    } catch (error) {
        return error.response.data;
    }
})

const mainItemSlice = createSlice({
    name: 'items',
    initialState: {
        item: [],
        errors: null
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getItem.fulfilled, (state, action) => {
            state.item = action.payload
            state.errors= null
        })

        builder.addCase(handlePage.fulfilled, (state, action) => {
            state.item = action.payload
        })

        builder.addCase(handleSearch.fulfilled, (state, action) => {
            state.item = action.payload
            state.errors= null
        })

        builder.addCase(handleCloseSearch.fulfilled, (state, action) => {
            state.item = action.payload
            state.errors= null
        })

        // builder for post items

        builder.addCase(postItem.fulfilled, (state, action) => {
            state.item = action.payload
            state.errors= null
        });

        builder.addCase(postItem.rejected, (state, action) => {
            state.errors = action.payload
        })
    }
})

export default mainItemSlice.reducer