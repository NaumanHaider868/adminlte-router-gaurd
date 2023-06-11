import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../pages/services/ApiUrl";

export const getCategorie = createAsyncThunk('getCategorie', async(page)=>{
    const response = await api.get(`categories?page=${page}`)
    return response
})

const mainCategoriesSlice=createSlice({
    name: 'categories',
    initialState:{
        categorie: [],
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCategorie, (state,action)=>{
            state.categorie = action.payload
        })
    }
})

export default mainCategoriesSlice.reducer