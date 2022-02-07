export const githubReducer =(state,action)=>{
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users:action.usersData,
                loading:false
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading:true
            }
    
        case 'CLEAR_USERS':
            return{
                ...state,
                users:action.payload
            }
        default:
            return {...state}
    }
}