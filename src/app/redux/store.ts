import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./API/base.api";
import authReducer from "./features/auth/auth.slice";
import notesReducer from "./features/notes/notes.slice";
import postsReducer from "./features/posts/posts.slice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		notes: notesReducer,
		posts: postsReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
