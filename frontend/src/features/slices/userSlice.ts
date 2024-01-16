import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import UsersFile from "../../../mock/users/users.json";

interface IModeContext {
  state: "loading" | "error" | "sucsses";
  users: object;
  currentUser: string;
  lang: "en" | "cs";
}

const Users = createSlice({
  name: "users",
  initialState: {
    state: "loading",
    users: {
      ...UsersFile,
    },
    currentUser: "01",
    lang: "en",
  } as IModeContext,
  reducers: {
    setUsersState: (state, action) => {
      return { ...state, state: action.payload };
    },
    setUsers: (state, action) => {
      setUsersState("sucsses");
      return { ...state, users: action.payload };
    },
    setUser: (state, action) => {
      setUsersState("sucsses");
      return { ...state, currentUser: action.payload };
    },
    setLang: (state, action) => {
      setUsersState("sucsses");
      return { ...state, lang: action.payload };
    },
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUser = (state: RootState) => state.users.currentUser;
export const selectUserState = (state: RootState) => state.users.state;
export const selectLang = (state: RootState) => state.users.lang;
export const { setUsersState, setUsers, setUser, setLang } = Users.actions;
export default Users.reducer;
