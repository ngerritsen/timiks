import { createSlice } from "@reduxjs/toolkit";

type LoginPromotionState = {
  shouldPromoteLogin: boolean;
};

const initialState: LoginPromotionState = {
  shouldPromoteLogin: false,
};

const { reducer, actions } = createSlice({
  name: "login",
  initialState,
  reducers: {
    promoteLogin: () => ({
      shouldPromoteLogin: true,
    }),
    dismissLoginPromotion: () => ({
      shouldPromoteLogin: false,
    }),
  },
});

export default reducer;
export const { dismissLoginPromotion, promoteLogin } = actions;
