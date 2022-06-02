import { getDataFromAPI } from "../api/api";

const SET_ABOUT = 'SET_ABOUT';

let initialState = {
    about: [],
    loading: true
};

const aboutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ABOUT: {
            return {
                ...state,
                about: action.about,
                loading: false
            }
        }
        default:
            return state;
    }
}

export const setAbout = (about) => ({ type: SET_ABOUT, about})


export const getAboutThunk = () => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getAbout()
        dispatch(setAbout(data))
        return data
    }
}


export default aboutReducer