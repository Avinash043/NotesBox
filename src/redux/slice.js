import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
};

export const notesBoxSlice = createSlice({
  name: "notesBox",
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      const note = action.payload;
      if (note.title === "" || note.content === "") {
        toast.error("Please enter both title and content");
      } else {
        state.notes.push(note);
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast("Notes created successfully");
      }
    },
    updateToNotes: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => item._id === note._id);

      if (index >= 0) {
        state.notes[index] = note;

        localStorage.setItem("notes", JSON.stringify(state.notes));

        toast.success("Note Updated");
      }
    },
    resetToNotes: (state, action) => {
      state.notes = [];

      localStorage.removeItem("notes");
    },
    removeFromNotes: (state, action) => {
      const noteId = action.payload;

      const index = state.notes.findIndex((item) => item._id === noteId);

      if (index >= 0) {
        state.notes.splice(index, 1);

        localStorage.setItem("notes", JSON.stringify(state.notes));

        toast.success("Note deleted");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToNotes, updateToNotes, removeFromNotes, resetToNotes } =
  notesBoxSlice.actions;

export default notesBoxSlice.reducer;
