import { getDataFromAPI } from "../api/api";

const SET_LOGO = 'SET_LOGO';
const SET_CONTACTS = 'SET_CONTACTS';
const SET_BESTSELLER = 'SET_BESTSELLER';
const SET_NOVELTY = 'SET_NOVELTY';
const SET_COLLECTIONS = 'SET_COLLECTIONS';
const SET_COLLECTION = 'SET_COLLECTION';
const SET_ADVANTAGES = 'SET_ADVANTAGES';


let initialState = {
    logo: [],
    contacts: [],
    bestseller: [],
    novelty: [],
    collections: [],
    collection: [],
    advantages: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGO: {
            return {
                ...state,
                logo: action.logo
            }
        }
        case SET_CONTACTS: {
            return {
                ...state,
                contacts: action.contacts
            }
        }
        case SET_BESTSELLER: {
            return {
                ...state,
                bestseller: action.bestseller
            }
        }
        case SET_NOVELTY: {
            return {
                ...state,
                novelty: action.novelty
            }
        }
        case SET_COLLECTIONS: {
            return {
                ...state,
                collections: action.collections
            }
        }
        case SET_COLLECTION: {
            return {
                ...state,
                collection: action.collection
            }
        }
        case SET_ADVANTAGES: {
            return {
                ...state,
                advantages: action.advantages
            }
        }
        case "ADD_TO_STATE": {
            console.log(action.favorites);
            return {
                ...state,
                favorites: action.favorites
            }
        }

        default:
            return state;
    }
}

export const setLogo = (logo) => ({ type: SET_LOGO, logo })
export const setContacts = (contacts) => ({ type: SET_CONTACTS, contacts })
export const setBestseller = (bestseller) => ({ type: SET_BESTSELLER, bestseller })
export const setNovelty = (novelty) => ({ type: SET_NOVELTY, novelty })
export const setCollections = (collections) => ({ type: SET_COLLECTIONS, collections })
export const setCollection = (collection) => ({ type: SET_COLLECTION, collection })
export const setAdvantages = (advantages) => ({ type: SET_ADVANTAGES, advantages })


export const getLogoThunk = () => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getLogo()
        dispatch(setLogo(data))
        return data
    }
}

export const getContactsThunk = () => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getContacts()
        dispatch(setContacts(data))
        return data
    }
}
export const getBestsellerThunk = (limit) => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getBestseller(limit)
        dispatch(setBestseller(data))
        return data
    }
}
export const getNoveltyThunk = (limit) => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getNovelty(limit)
        dispatch(setNovelty(data))
        return data
    }
}
export const getCollectionsThunk = (limitCollections) => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getCollections(limitCollections)
        dispatch(setCollections(data))
        return data
    }
}
export const getCollectionThunk = (name) => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getCollection(name)
        dispatch(setCollection(data))
        return data
    }
}
export const getAdvantagesThunk = () => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getAdvantages()
        dispatch(setAdvantages(data))
        return data
    }
}



export default mainReducer