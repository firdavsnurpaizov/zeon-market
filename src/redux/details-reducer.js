import { getDataFromAPI } from "../api/api";

const SET_DETAILS = 'SET_DETAILS';
const SET_SIMILAR = 'SET_SIMILAR';

let initialState = {
    details: [],
    similar: []
};

const detailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DETAILS: {
            return {
                ...state,
                details: action.details,
            }
        }
        case SET_SIMILAR: {
            return {
                ...state,
                similar: action.similar,
            }
        }
        default:
            return state;
    }
}

export const setDetails = (details) => ({ type: SET_DETAILS, details})
export const setSimilar = (similar) => ({ type: SET_SIMILAR, similar})


export const getDetailsThunk = (name, id) => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getDetails(name, id)
        dispatch(setDetails(data))
        return data
    }
}
export const getSimilarThunk = (name, id) => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getSimilar(name, id)
        dispatch(setSimilar(data))
        return data
    }
}


export default detailsReducer