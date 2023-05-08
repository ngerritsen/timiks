import { RootState } from "../store";

export const isOnline = (state: RootState) => state.network.isOnline;
