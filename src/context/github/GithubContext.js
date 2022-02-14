import { createContext, useReducer } from "react";
import { githubReducer } from "./GithubReducer";

//create context
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider =({children})=>{
    //state
    // const [users,setUsers] = useState([])
    // const [isLoading,setIsLoading] = useState(true)
    const initialState = {
        users:[],
        user:{},
        repos:[],
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

    //get a specific user
    const getUser = async (login)=>{

        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
            headers:{
                Authorization:`token ${GITHUB_TOKEN}`
            }
        })
        if(response.status === 404){
            window.location = '/notfound'
        }else{
            const userData = await response.json()
            // console.log(userData)

            //we dispatch down here..
            dispatch({
                type:'GET_USER',
                payload:userData,
            })
        }
    }

    //get a user's repo
    const getUserRepo = async (login)=>{

        setLoading()

        const params = new URLSearchParams({
            sort:'created',
            per_page:10
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos??${params}`,{
            headers:{
                Authorization:`token ${GITHUB_TOKEN}`
            }
        })
        const userRepoData = await response.json()
        console.log(userRepoData)

        //we dispatch down here..
        dispatch({
            type:'GET_USER_REPO',
            payload:userRepoData,
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
                user:state.user,
                loading:state.loading,
                repos:state.repos,
                fetchUsers,
                getUser,
                getUserRepo,
                clearUsers
            }}
        >
        {children}
        </GithubContext.Provider>
    )
}
export default GithubContext 