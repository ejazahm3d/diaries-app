import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../../interfaces/entry.interface";
import axios from "axios";

// const fetchEntries = createAsyncThunk('entries/fetchEntries', async (payload, thunkAPI) => {
//   const res = await axios.get<null, { entries: Entry[] }>(
//     `users/${payload.userId}/diaries/${payload.diaryId}/entries`
//   )
// })

const entries = createSlice({
  name: "entries",
  initialState: [] as Entry[],
  reducers: {
    setEntries(state, { payload }: PayloadAction<Entry[] | null>) {
      return (state = payload != null ? payload : []);
    },
    updateEntry(state, { payload }: PayloadAction<Entry>) {
      const { id } = payload;
      const index = state.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.splice(index, 1, payload);
      }
    },
  },
  // extraReducers: {
  //   [fetchEntries.fulfilled]: (state, action: PayloadAction<Entry[]>) => {
  //     // Add user to the state array
  //     state = action.payload
  //   }
  // }
});

export const { setEntries, updateEntry } = entries.actions;
export default entries.reducer;
