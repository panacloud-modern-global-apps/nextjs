import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

//https://nextjs.org/docs/basic-features/typescript
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};

interface User {
  id: number;
  username: string;
  name: string;
  phone: String;
  email: string;
}

function UserData({ user }: { user: User }) {
  return (
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
          <b>Job title:</b> {user.phone}
        </div>
      </div>
    </div>
  );
}

interface Props {
  id: string;

}

const UserPage: NextPage<Props> = (props: Props) => {
  const id = props.id;
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<User | null>(null);

  const getUserData = async () => {
    const req = await fetch(`/api/singleUser?id=${id}`);
    const data = await req.json();
    setLoading(false);
    setData(data);
  };
  //jsonplaceholder.typicode.com/users
  https: useEffect(() => {
    //console.log("useEffect Called");
    getUserData();
  }, []);

  return (
    <div>
      <div>
        <Link href="/" passHref>
          Back to home
        </Link>
      </div>
      <hr />
      {loading && <div>Loading user data...</div>}

      {data && <UserData user={data} />}
    </div>
  );
};

export default UserPage;
