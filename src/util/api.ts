import { AxiosError, AxiosResponse as ARes } from "axios";
import { NextApiRequest as NReq, NextApiResponse as NRes } from "next";

const withApi = async (
  req: NReq,
  res: NRes,
  met: "POST" | "GET",
  fn: (req: NReq, res: NRes) => Promise<any>
) => {
  const { method } = req;

  if (method === met) return fn(req, res);

  res.setHeader("Allow", [met]);
  return res.status(405).end(`Method ${method} not allowed`);
};

const withMiddle = async (fn: () => Promise<ARes>) => {
  try {
    const res = await fn();
    return [res.data, null];
  } catch (error) {
    return [null, error];
  }
};

export { withApi, withMiddle };
export type { NReq, NRes };
