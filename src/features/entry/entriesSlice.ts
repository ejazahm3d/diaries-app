import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../../interfaces/entry.interface";
import axios from "axios";

const baseURL = "http://localhost:3000/api";

export const fetchEntries = createAsyncThunk(
  "entries/fetchEntries",
  async (payload: { userId: string; diaryId: string }, thunkAPI) => {
    const res = await fetch(
      `${baseURL}/users/${parseInt(payload.userId)}/diaries/${parseInt(
        payload.diaryId
      )}/entries`
    );
    // http
    //   .get<null, { entries: Entry[] }>(
    //     `users/${payload.userId}/diaries/${payload.diaryId}/entries`
    //   )
    //   .then((data) => {
    //     const { entries: _entries } = data;
    //     if (_entries) {
    //       const sortByLastUpdated = _entries?.sort?.((a, b) => {
    //         return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
    //       });
    //       console.log(sortByLastUpdated);
    //       dispatch(setEntries(sortByLastUpdated));
    //     }
    //   });
    return (await res.json()) as Entry[];
  }
);

const entries = createSlice({
  name: "entries",
  initialState: [] as Entry[],
  reducers: {
    updateEntry(state, { payload }: PayloadAction<Entry>) {
      const { id } = payload;
      const index = state.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.splice(index, 1, payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchEntries.fulfilled,
      (state, action: PayloadAction<Entry[]>) => {
        // Add user to the state array
        state = action.payload;
      }
    );
  },
});

export const { updateEntry } = entries.actions;
export default entries.reducer;
