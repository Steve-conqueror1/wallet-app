import { Request, Response, ErrorRequestHandler } from "express";

import { sendFunds, getTransactionHistory } from "../services/walletService";

export const sendMoney = async (req: Request, res: Response) => {
  const { fromAccountId, toAccountId, amount } = req.body;

  try {
    await sendFunds(fromAccountId, toAccountId, amount);
    res.status(200).json({ message: "Transaction successiful" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const viewTransactionHistory = async (req: Request, res: Response) => {
  const { accountId } = req.params;

  try {
    const history = await getTransactionHistory(parseInt(accountId));

    res.status(200).json(history);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
