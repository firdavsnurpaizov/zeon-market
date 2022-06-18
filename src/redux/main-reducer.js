import { getDataFromAPI } from "../api/api";

const SET_SEARCH = 'SET_SEARCH';
const SET_LOGO = 'SET_LOGO';
const SET_CONTACTS = 'SET_CONTACTS';
const SET_BESTSELLER = 'SET_BESTSELLER';
const SET_NOVELTY = 'SET_NOVELTY';
const SET_COLLECTIONS = 'SET_COLLECTIONS';
const SET_ALL_COLLECTIONS = 'SET_ALL_COLLECTIONS';
const SET_COLLECTION = 'SET_COLLECTION';
const SET_ADVANTAGES = 'SET_ADVANTAGES';
const ADD_TO_STATE = 'ADD_TO_STATE';
const ADD_TO_CART = 'ADD_TO_CART';
const ADD_QUANTITY = 'ADD_QUANTITY';
const SET_INCREMENT = 'SET_INCREMENT';
const SET_DECREMENT = 'SET_DECREMENT';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';
const SET_USER = 'SET_USER';

let initialState = {
    search: [],
    logo: [],
    contacts: [],
    bestseller: [],
    novelty: [],
    collections: [],
    allCollections: [],
    collection: [],
    advantages: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    searchResult: [],
    currentUser: null,
    
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                currentUser: action.data
            }
        }
        case SET_SEARCH: {
            return {
                ...state,
                search: action.search
            }
        }
        case ADD_SEARCH_RESULT: {
            console.log(action);
            return {
                ...state,
                searchResult: action.data
            }
        }
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
        case SET_ALL_COLLECTIONS: {
            return {
                ...state,
                allCollections: action.allCollections
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
        case ADD_TO_STATE: {
            return {
                ...state,
                favorites: action.favorites
            }
        }
        case ADD_TO_CART: {
            return {
                ...state,
                cart: action.cart
            }
        }
        case REMOVE_ITEM_FROM_CART: {
            const index = state.cart.findIndex(
                (item) =>
                    item.id === action.data.id && item.colors === action.data.colors
            );
            const copyState = [...state.cart];
            copyState.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(copyState));
            return { ...state, cart: copyState }
        }
        case ADD_QUANTITY: {
            return {
                ...state,
                quantity: state.quantity + action.quantity
            }
        }
        case SET_INCREMENT: {
            const copyState = state.cart?.map(item => {
                const newItem = { ...item }
                if (
                    item.id === action.data.id && item.colors === action.data.colors
                ) {
                    newItem.count += 1
                }
                return newItem

            })
            localStorage.setItem('cart', JSON.stringify(copyState))
            return { ...state, cart: copyState }
        }
        case SET_DECREMENT: {
            if (action.data.count <= 1) {
                return state
            } else {

                const copyState = state.cart?.map(item => {
                    const newItem = { ...item }
                    if (
                        item.id === action.data.id && item.colors === action.data.colors
                    ) {
                        newItem.count -= 1
                    }
                    return newItem

                })
                localStorage.setItem('cart', JSON.stringify(copyState))
                return { ...state, cart: copyState }
            }
        }

        default:
            return state;
    }
}

export const setSearch = (search) => ({ type: SET_SEARCH, search })
export const setLogo = (logo) => ({ type: SET_LOGO, logo })
export const setContacts = (contacts) => ({ type: SET_CONTACTS, contacts })
export const setBestseller = (bestseller) => ({ type: SET_BESTSELLER, bestseller })
export const setNovelty = (novelty) => ({ type: SET_NOVELTY, novelty })
export const setCollections = (collections) => ({ type: SET_COLLECTIONS, collections })
export const setAllCollections = (allCollections) => ({ type: SET_ALL_COLLECTIONS, allCollections })
export const setCollection = (collection) => ({ type: SET_COLLECTION, collection })
export const setAdvantages = (advantages) => ({ type: SET_ADVANTAGES, advantages })
export const setInctement = (data) => ({ type: SET_INCREMENT, data })
export const setDecrement = (data) => ({ type: SET_DECREMENT, data })
export const removeItemFromCart = (data) => ({ type: REMOVE_ITEM_FROM_CART, data })
export const setSearchData = (data) => ({ type: ADD_SEARCH_RESULT, data })
export const setUser = (data) => ({ type: SET_USER, data })

export const getUserThunk = (id) => {
    return async (dispatch) => {
        if (id) {
            const data = await getDataFromAPI.getUser(id)
            dispatch(setUser(data))
            return data
        } else {
            dispatch(setUser(null))
        }
    }
}

export const getSearchThunk = () => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getSearch()
        dispatch(setSearch(data))
        return data
    }
}
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
export const getCollectionsThunk = (limitCollections, page) => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getCollections(limitCollections, page)

        dispatch(setCollections(data))
        return data
    }
}
export const getAllCollectionsThunk = () => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getAllCollections()
        dispatch(setAllCollections(data))
        return data
    }
}
export const getCollectionThunk = (name, limit, page) => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getCollection(name, limit, page)
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