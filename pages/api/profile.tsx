import authentication from "server/middlewares/authentication";
import { NextApiRequest, NextApiResponse } from "next";

let FAKE_DATA = {
  name: "Cuong Hoang",
  status: "active",
  walletCode: "7852 1444 9666 5858",
  balance: [
    {
      id: 0,
      code: "USD",
      amount: "1030",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 1,
      code: "EUR",
      amount: "123.5",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 2,
      code: "YEN",
      amount: "1450",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },
    {
      id: 3,
      code: "USD",
      amount: "1560",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 4,
      code: "EUR",
      amount: "1120",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 5,
      code: "YEN",
      amount: "1780",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },
    {
      id: 6,
      code: "USD",
      amount: "4540",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 7,
      code: "EUR",
      amount: "6760",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 8,
      code: "YEN",
      amount: "56560",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },
    {
      id: 9,
      code: "USD",
      amount: "10343",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 10,
      code: "EUR",
      amount: "10343",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 11,
      code: "YEN",
      amount: "4543",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },
    {
      id: 12,
      code: "USD",
      amount: "645645",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 13,
      code: "EUR",
      amount: "767",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 14,
      code: "YEN",
      amount: "232",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },

    {
      id: 15,
      code: "USD",
      amount: "677",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 16,
      code: "EUR",
      amount: "2325",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 17,
      code: "YEN",
      amount: "6767",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },

    {
      id: 18,
      code: "USD",
      amount: "2323",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 19,
      code: "EUR",
      amount: "76767",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 20,
      code: "YEN",
      amount: "232323",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },

    {
      id: 21,
      code: "USD",
      amount: "4545",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 22,
      code: "EUR",
      amount: "232",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 23,
      code: "YEN",
      amount: "76767",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },

    {
      id: 24,
      code: "USD",
      amount: "232",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 25,
      code: "EUR",
      amount: "9898",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 26,
      code: "YEN",
      amount: "2323",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },

    {
      id: 27,
      code: "USD",
      amount: "7878",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 28,
      code: "EUR",
      amount: "2323",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 29,
      code: "YEN",
      amount: "9898",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },

    {
      id: 30,
      code: "USD",
      amount: "2323",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2WYBtFG/image-9.png",
    },
    {
      id: 31,
      code: "EUR",
      amount: "9090",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/6YZPHBY/image-7.png",
    },
    {
      id: 32,
      code: "YEN",
      amount: "2323",
      convertRateToTarget: "22800",
      targetMoneyCode: "VND",
      logo: "https://i.ibb.co/2MkKx0V/image-8.png",
    },
  ],
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") _handleGETRequest(req, res);
  else if (req.method === "POST") _handlePOSTRequest(req, res);
  else _handleOtherRequest(req, res);
};

const _handlePOSTRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const updatedList = req.body;
  res.status(200).json(updatedList);
};

const _handleGETRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(FAKE_DATA);
};

const _handleOtherRequest = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({});
};

export default authentication(handler);
