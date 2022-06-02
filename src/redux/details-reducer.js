import { getDataFromAPI } from "../api/api";

const SET_DETAILS = 'SET_DETAILS';

let initialState = {
    details: []
};

const detailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DETAILS: {
            return {
                ...state,
                details: action.details,
            }
        }
        default:
            return state;
    }
}

export const setDetails = (details) => ({ type: SET_DETAILS, details})


export const getDetailsThunk = (name, id) => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getDetails(name, id)
        dispatch(setDetails(data))
        return data
    }
}


export default detailsReducer