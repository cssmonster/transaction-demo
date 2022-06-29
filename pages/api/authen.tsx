import authentication from "server/middlewares/authentication";
import { FAKE_ACCESS_TOKEN } from "constants/index";
import { NextApiRequest, NextApiResponse } from "next";

const DEMO_PASSWORD = "123";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") _handlePostRequest(req, res);
  else _handleOtherRequest(req, res);
};

const _handlePostRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.status(200).json({
    authorized: true,
  });
};

const _handleOtherRequest = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({});
};

export default authentication(handler);
