import { AxiosResponse as ARes } from "axios";
import { NextApiRequest as NReq, NextApiResponse as NRes } from "next";

// TODO: Change any for types.

const withApi = async (
  req: NReq,
  res: NRes,
  met: "POST" | "GET",
  fn: () => Promise<any>
) => {
  const { method } = req;

  if (method === met) return fn();

  res.setHeader("Allow", [met]);
  return res.status(405).end(`Method ${method} not allowed`);
};

interface IMiddle {
  res: any;
  error: any;
}

const withMiddle = async (fn: () => Promise<ARes>): Promise<IMiddle> => {
  try {
    const res = await fn();
    return { res: res.data, error: null };
  } catch (error) {
    return { res: null, error: error.response.data };
  }
};

export { withApi, withMiddle };
export type { NReq, NRes };
