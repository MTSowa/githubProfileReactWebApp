import {useEffect} from 'react'
import { useContext } from 'react';
import Spinner from '../layouts/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext'




function UsersResults() {
    const {users,isLoading,fetchUsers} = useContext(GithubContext)
    // const [users,setUsers] = useState([])
    // const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
      fetchUsers()
    }, []);



    if (!isLoading) {
        return (
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {users.map((user) => (
            <UserItem key={user.id} user={user}/>
            ))}
        </div>
        )
    } else {
    return <div><Spinner /></div>
  }
}

export default UsersResults;
