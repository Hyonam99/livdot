import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ticketData } from "@/constants/ticketData";

type PricingInput = { eventId: string; price: number; capacity: number };

const ticketSlice = createSlice({
  name: "tickets",
  initialState: ticketData,
  reducers: {
    savePricing: (state, { payload }: PayloadAction<PricingInput>) => {
      const ticket = state.find((item) => item.eventId === payload.eventId);
      if (ticket) Object.assign(ticket, payload);
      else state.push({ ...payload, currency: "NGN", sold: 0 });
    },
  },
});

export const { savePricing } = ticketSlice.actions;

export default ticketSlice.reducer;
