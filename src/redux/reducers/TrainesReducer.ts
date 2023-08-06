import { getTraines } from "../../api/traines"
import { TMutateTraineList, TTraineList } from "../../utils/TrainesType"
import { mutateTraine } from "../../utils/fuctionTraineCharacteristics"
import { AppDispatch, AppThunk, RootState } from "../store"

const GET_TRAINES_SUCCESS: 'GET_TRAINES_SUCCESS' = 'GET_TRAINES_SUCCESS'
const GET_TRAINES_FAILED: 'GET_TRAINES_FAILED' = 'GET_TRAINES_FAILED'
const GET_TRAINES_START: 'GET_TRAINES_START' = 'GET_TRAINES_START'
const SET_TRAINE: 'SET_TRAINE' = 'SET_TRAINE'

type TrainesState = {
    traines: TTraineList[];
    loading: boolean;
    error: unknown;
    selectedTraine: TMutateTraineList | null;
}


export const initialState: TrainesState = {
    traines: [],
    loading: false,
    error: null,
    selectedTraine: null,
}



export const trainesReducer = (state = initialState, action: TGetTrainesAction): TrainesState => {
    switch(action.type) {
        case GET_TRAINES_SUCCESS:
            return {
                ...state,
                traines: action.traines,
                loading: false,
            }   
            
        case GET_TRAINES_START:
            return {
                ...state,
                loading: true,
            } 

        case GET_TRAINES_FAILED:
            return {
                ...state,
                error: action.error,
            } 

        case SET_TRAINE:
            return {
                ...state,
                selectedTraine: action.traine
            } 

        default: {
            return state    
        }    
    }
}

export const getTrainesSelector = (state: RootState) => state.trainesReducer
export const getTraineSelector = (state: RootState) => state.trainesReducer.selectedTraine

interface getTrainesSuccessAction {
    readonly type: typeof GET_TRAINES_SUCCESS;
    readonly traines: TTraineList[]
}

interface getTrainesFailedAction {
    readonly type: typeof GET_TRAINES_FAILED;
    readonly error: unknown
}

interface getTrainesStartedAction {
    readonly type: typeof GET_TRAINES_START;
}

interface setTraineAction {
    readonly type: typeof SET_TRAINE;
    readonly traine: TMutateTraineList
}

export type TGetTrainesAction = 
    | getTrainesSuccessAction
    | getTrainesFailedAction
    | getTrainesStartedAction
    | setTraineAction;


export const getTrainesSuccess = (traines: TTraineList[]): getTrainesSuccessAction => ({
    type: GET_TRAINES_SUCCESS,
    traines,
})

export const getTrainesFailed = (error: unknown): getTrainesFailedAction => ({
    type: GET_TRAINES_FAILED,
    error,
})

export const getTrainesStarted = (): getTrainesStartedAction => ({
    type: GET_TRAINES_START,
})



export const setTraine =(traine: TTraineList): setTraineAction => ({
    type: SET_TRAINE,
    traine: mutateTraine(traine)
})

export const getTrainesThunk: AppThunk =  () => {
    return async(dispatch: AppDispatch) => {
        try {
            dispatch(getTrainesStarted())

            const response = await getTraines();

            dispatch(getTrainesSuccess(response))

        } catch(error: unknown) {
            dispatch(getTrainesFailed(error))
        }

    }
}




