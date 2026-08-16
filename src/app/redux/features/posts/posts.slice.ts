import { createSlice } from "@reduxjs/toolkit";

type PostsState = {
    activeUserForPosts: string | null;
};

const initialState: PostsState = { activeUserForPosts: null };

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setActiveUserForPosts: (state, { payload }: { payload: string | null }) => {
            state.activeUserForPosts = payload;
        },
    },
});

export const { setActiveUserForPosts } = postsSlice.actions;

export default postsSlice.reducer;
