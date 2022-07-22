import type { NextPage } from "next";
import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";

//https://nextjs.org/docs/basic-features/typescript
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

// pages/users/[username].js
export const getStaticPaths: GetStaticPaths = async () => {
  const usersReq = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  const users: User[] = usersReq.data;
  const paths = users.map((user) => ({
    params: {
      id: `${user.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context!.params!.id;
  const userReq = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (userReq.status === 404) {
    //console.log("ERROR");
    return {
      notFound: true,
    };
  }
  console.log(userReq.data);

  return {
    props: {
      user: userReq.data,
    },
  };
};

interface User {
  id: number;
  username: string;
  name: string;
  phone: string;
  website: string;
  email: string;
  company: {
    name: String;
    catchPhrase: String;
    bs: String;
  };
  address: {
    street: String;
    city: String;
  };
}

interface Props {
  user: User;
}

//https://stackoverflow.com/questions/69560905/how-to-type-a-page-component-with-props-in-next-js
//https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#typescript
//https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
const UserPage: NextPage<Props> = (props: Props) => {
  const user: User = props.user;
  return (
    <div>
      <div>
        <Link href="/" passHref>
          Back to home
        </Link>
      </div>
      <hr />
      <div style={{ display: "flex" }}>
        <div>
          <div>
            <b>Username:</b> {user.username}
          </div>
          <div>
            <b>Full name:</b>
            {user.name}
          </div>
          <div>
            <b>Email:</b> {user.email}
          </div>
          <div>
            <b>Company:</b> {user.company.name}
          </div>
          <div>
            <b>Address:</b> {user.address.street} , {user.address.city}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
