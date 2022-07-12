import type { NextPage } from "next";
import Link from "next/link";
import axios from "axios";

//https://nextjs.org/docs/basic-features/typescript
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  // console.log(data);
  return {
    props: {
      users: data,
    },
  };
};

//https://stackoverflow.com/questions/69560905/how-to-type-a-page-component-with-props-in-next-js
//https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#typescript
//https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
type User = {
  id: number;
  email: String;
  username: String;
  name: String;
};
const Home: NextPage<GetServerSideProps> = (props: GetServerSideProps) => {
  let users = props.users;
  return (
    <ul>
      {users.map((user: User) => (
        <li key={user.id}>
          <Link href={`/users/${user.id}`}>
            <a> {user.name} </a>
          </Link>
          <p> {user.username}</p>
        </li>
      ))}
    </ul>
  );
};

export default Home;
