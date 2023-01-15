import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import localStorageService from "../services/localStorage.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        commentCreatedFailed: (state, action) => {
            state.error = action.payload;
        },
        commentRemovedFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentRemoved,
    commentCreatedFailed,
    commentRemovedFailed
} = actions;

const commentCreatedRequested = createAction(
    "comments/commentCreatedRequested"
);
const commentRemovedRequested = createAction(
    "comments/commentRemovedRequested"
);

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment =
    ({ userId, ...data }) =>
    async (dispatch) => {
        dispatch(commentCreatedRequested());
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: localStorageService.getUserId()
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(commentCreatedFailed(error.message));
        }
    };

export const removeComment = (id) => async (dispatch) => {
    dispatch(commentRemovedRequested());
    try {
        await commentService.removeComment(id);
        dispatch(commentRemoved(id));
    } catch (error) {
        dispatch(commentRemovedFailed(error.message));
    }
};

export default commentsReducer;
