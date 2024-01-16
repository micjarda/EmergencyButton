import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import ListsFile from "../../../mock/lists/lists.json";

interface IListsContext {
  state: "loading" | "error" | "sucsses";
  lists: object;
  selectedCategory: string;
  currentList: string;
}

const Lists = createSlice({
  name: "lists",
  initialState: {
    state: "loading",
    lists: {
      ...ListsFile,
    },
    selectedCategory: "all",
    currentList: "001",
    currentUser: "01",
  } as IListsContext,
  reducers: {
    setListState: (state, action) => {
      return { ...state, state: action.payload };
    },
    setLists: (state, action) => {
      return { ...state, lists: action.payload };
    },
    setCategory: (state, action) => {
      return { ...state, selectedCategory: action.payload };
    },
    setCurrentList: (state, action) => {
      return { ...state, currentList: action.payload };
    },
  },
});

export const selectLists = (state: RootState) => state.lists.lists;
export const selectCategory = (state: RootState) =>
  state.lists.selectedCategory;
export const selectCurrentList = (state: RootState) =>
  state.lists.currentList;
export const selectListsState = (state: RootState) => state.lists.state;
export const { setListState, setLists, setCategory, setCurrentList } =
  Lists.actions;
export default Lists.reducer;
