import { createSlice } from "@reduxjs/toolkit";
const rootSlice = createSlice({
    name:'root',
    initialState:{
        loading:false,
        portfolioData:null
    },
    reducers:{
        ShowLoading:(state,action) =>{
            state.loading = true;
        },
        HideLoading:(state,action) =>{
            state.loading = false;
        },
        SetPortFolioData:(state,action) =>{
            state.portfolioData = { ...state.portfolioData, ...action.payload };
        },
    },
})

export default rootSlice.reducer;
export const {ShowLoading,HideLoading,SetPortFolioData} = rootSlice.actions;