import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
};

//https://nextjs.org/docs/api-routes/introduction
//https://nextjs.org/docs/basic-features/typescript#api-routes
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const id = req.query.id;
  const userReq = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  res.status(200).json(userReq.data);
}
