import {useState,useEffect} from 'react'
import Spinner from '../layouts/Spinner';




function UsersResults() {
    const [users,setUsers] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
      fetchUsers();
    }, []);

    
    const fetchUsers = async ()=>{
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
        const data = await response.json()
        //placing the data from the fetch into state..
        setUsers(data)
        setIsLoading(false)
    }

    if (!isLoading) {
        return (
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {users.map((user) => (
            <h3>{user.login}</h3>
            ))}
        </div>
        )
    } else {
    return <div>{Spinner}</div>
  }
}

export default UsersResults;
