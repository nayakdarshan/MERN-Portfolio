import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        loading: false,
        portfolioData: null,
        isGuest: false, 
    },
    reducers: {
        ShowLoading: (state) => {
            state.loading = true;
        },
        HideLoading: (state) => {
            state.loading = false;
        },
        SetPortFolioData: (state, action) => {
            state.portfolioData = { ...state.portfolioData, ...action.payload };
        },
        SetGuestStatus: (state, action) => {
            state.isGuest = action.payload;
        },
    },
});

export default rootSlice.reducer;
export const { ShowLoading, HideLoading, SetPortFolioData, SetGuestStatus } = rootSlice.actions;
