import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"; 
import thunkMiddleware from "redux-thunk";
import aboutReducer from "./about-reducer";
import detailsReducer from "./details-reducer";
import mainReducer from "./main-reducer";
import newsReducer from "./news-reducer";

let redusers = combineReducers({
    main: mainReducer,
    about: aboutReducer,
    news: newsReducer,
    details: detailsReducer

});


let store = createStore(redusers, applyMiddleware(thunkMiddleware));



export default store;