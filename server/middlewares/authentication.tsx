import { NextApiRequest, NextApiResponse } from "next";
import { FAKE_ACCESS_TOKEN } from "constants/index";

const authentication = (handler: any) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const isAuthPropsExisted = req.headers.hasOwnProperty("authorization");
    if (
      isAuthPropsExisted &&
      req.headers.authorization === `Bearer ${FAKE_ACCESS_TOKEN}`
    ) {
      return handler(req, res);
    } else {
      res.status(401).json({ message: "Unauthorized!" });
    }
  };
};

export default authentication;
