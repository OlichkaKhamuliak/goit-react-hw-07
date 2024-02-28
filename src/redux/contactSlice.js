import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://65df0be9ff5e305f32a147bb.mockapi.io";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
});

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const contactsReducer = contactsSlice.reducer;

// reducers: {
//   addContact: (state, action) => {
//     state.items.push(action.payload);
//   },
//   deleteContact: (state, action) => {
//     state.items = state.items.filter(
//       (contact) => contact.id !== action.payload
//     );
//   },
// },

// export const { addContact, deleteContact } = contactsSlice.actions;
