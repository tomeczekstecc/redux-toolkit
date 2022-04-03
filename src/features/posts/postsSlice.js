import {createSlice, nanoid} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from "date-fns";

// const initialState = [
//     {
//         id: '1',
//         title: 'Learn Redux',
//         content: 'Redux is a predictable state container for JavaScript apps.',
//         date: sub(new Date(), {minutes: 10}).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//         }
//     },
//     {
//         id: '2',
//         title: 'Slices...',
//         content: 'Slices are a way to organize your app state into logical components.',
//         date: sub(new Date(), {minutes: 30}).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//         }
//     },
// ];

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return [...response.data];
    } catch (error) {
        return error.message;
    }

});

export const addPost = createAsyncThunk('posts/addPost', async (post) => {
    try {
        const response = await axios.post(POSTS_URL, post);
        return response.data;
    } catch (error) {
        return error.message;
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
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
            const post = state.posts.find(post => post.id === postId);
            post.reactions[reaction]++;
        },
    }, extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, _action) => {
            state.status = 'loading';
        })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                let min = 1
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: min++}).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    }
                    return post;
                })
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
            .addCase(addPost.fulfilled, (state, action) => {
                action.payload.userId = +action.payload.userId;
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                }

                state.posts.push(action.payload);
            })
    }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const {postAdded, removePost, reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;
