import { createContext, useReducer } from "react";
import { githubReducer } from "./GithubReducer";

//create context
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider =({children})=>{
    //state
    // const [users,setUsers] = useState([])
    // const [isLoading,setIsLoading] = useState(true)
    const initialState = {
        users:[],
        loading:false,
    }
    const [state,dispatch ] = useReducer(githubReducer,initialState) // using the useReducer Hook

 
    //fetch --- Search for users by name
    const fetchUsers = async (text)=>{

        setLoading()

           //search params
    const params = new URLSearchParams({
        q: text
    })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`)
        const {items} = await response.json()

        //we dispatch down here..
        dispatch({
            type:'GET_USERS',
            usersData:items,
        })

    }
    const setLoading = ()=> dispatch({
        type:'SET_LOADING'
    })
    
    //clear users from state
    const clearUsers =()=>{
        dispatch({
            type:'CLEAR_USERS',
            payload:initialState.users
        })
    }


    //return
    return (
        <GithubContext.Provider 
            value={{
                users:state.users,
                loading:state.loading,
                fetchUsers,
                clearUsers
            }}
        >
        {children}
        </GithubContext.Provider>
    )
}
export default GithubContext 