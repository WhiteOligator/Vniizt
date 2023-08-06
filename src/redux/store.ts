import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/rootReducer';
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk"; 
import { TGetTrainesAction } from './reducers/TrainesReducer';

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
)); 


export type TApplicationActions = 
     TGetTrainesAction;



export type RootState = ReturnType<typeof store.getState>;


export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 



export type AppDispatch = typeof store.dispatch