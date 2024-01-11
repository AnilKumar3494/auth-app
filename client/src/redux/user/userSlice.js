// import { createSlice } from "@reduxjs/toolkit"

// //initial states similar to SignIn.jsx
// const intialState = {
//     currentUser: null,
//     loading: false,
//     error: false,
// }

// //
// const userSlice = createSlice({
//     name: 'user',
//     intialState,
//     /*
//     reducers are functions we want to add. Using these we can the state of the user.
//     For example - chanage the state of loading, error and client user
//     */
//     reducers: {
//         //First reducer is signInStart
//         signInStart: (state) => {
//             state.loading = true
//         },
//         /*this will have state and action
//         action is getting data -- similar to data fetching from SignIn
//         this data can be added to reducer as action
//         */
//         signInSuccess: (state, action) => {
//             state.currentUser = action.payload
//             state.loading = false
//             state.error = false
//         },
//         signInFailure: (state, action) => {
//             state.loading = false
//             state.action = action.payload
//         }
//     }
// })

// export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

// export default userSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions
export default userSlice.reducer