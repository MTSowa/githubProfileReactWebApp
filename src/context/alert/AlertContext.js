import { createContext, useContext, useReducer } from "react";
import AlertReducer from './AlertReducer'


const AlertContext = createContext()

export const AlertProvider = ({children})=>{
    //state
    const initialState = {
        header:'',
        text:''
    }
    const {state,dispatch} = useReducer(AlertReducer,initialState)

    //return
    return <AlertContext.Provider value={{}}>
        {children}
    </AlertContext.Provider>
}