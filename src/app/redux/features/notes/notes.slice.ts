import { createSlice } from "@reduxjs/toolkit";

type NotesState = {
    selectedNoteId: string | null;
};

const initialState: NotesState = {
    selectedNoteId: null,
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        selectNote: (state, { payload }: { payload: string | null }) => {
            state.selectedNoteId = payload;
        },
    },
});

export const { selectNote } = notesSlice.actions;

export default notesSlice.reducer;
