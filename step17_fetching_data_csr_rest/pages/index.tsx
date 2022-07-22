import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface User{
  username: string;
  id: string;
}


function List({users}: {users: User[]}) {
    return (
      <ul>
      {
        users.map((user) =>
          <li key={user.id}>
          <Link href={`/users/${user.id}`} passHref>
            <a> {user.username} </a>
          </Link>
         </li>
        )
      }
       </ul>
    )
}




const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<User[]>([]);

  const getUsers = async () => {
    const req = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await req.json();
    setLoading(false);
    setData(users);
  }

   useEffect(() => {
     getUsers();
    }, []);

  
    return (
      <div>
        {loading &&<div>Loading users...</div>}
        {data.length>0 &&<List users={data} />}
      </div>
    )
}

export default Home;


