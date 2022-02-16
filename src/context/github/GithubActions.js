const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

//fetch --- Search for users by name
export const fetchUsers = async (text)=>{

    // setLoading()

    //search params
    const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{headers:{
        Authorization:`token ${GITHUB_TOKEN}`
    }})
    const {items} = await response.json()
    console.log(items)


    return items;

}

//clear users
// export const clearUsers =()=>{
//     dispatch({
//         type:'CLEAR_USERS',
//         payload:initialState.users
//     })
// }

//get a specific user
export const getUser = async (login)=>{

    const response = await fetch(`${GITHUB_URL}/users/${login}`,{
        headers:{
            Authorization:`token ${GITHUB_TOKEN}`
        }
    })
    if(response.status === 404){
        window.location = '/notfound'
    }else{
        const userData = await response.json()
        //we dispatch down here..
        // dispatch({
        //     type:'GET_USER',
        //     payload:userData,
        // })
        return userData
    }
}

//get a user's repo
export const getUserRepo = async (login)=>{
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
    // console.log(userRepoData)

    //we dispatch down here..
    // dispatch({
    //     type:'GET_USER_REPO',
    //     payload:userRepoData,
    // })

    return userRepoData

}