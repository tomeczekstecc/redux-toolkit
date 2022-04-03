import {createSlice, nanoid} from "@reduxjs/toolkit";
import {sub} from "date-fns";

const initialState = [
    {
        id: '1',
        title: 'Learn Redux',
        content: 'Redux is a predictable state container for JavaScript apps.',
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: 'Slices are a way to organize your app state into logical components.',
        date: sub(new Date(), {minutes: 30}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        }
    },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        }
                    }
                }
            }
        },
        reactionAdded: (state, action) => {
            const {postId, reaction} = action.payload;
            const post = state.find(post => post.id === postId);
            post.reactions[reaction]++;
        },
    }
});

export const selectAllPosts = (state) => state.posts;

export const {postAdded, removePost, reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;
