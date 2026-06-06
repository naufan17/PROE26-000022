import { Request, Response } from 'express';
import prisma from '../config/database';

export const accountController = () => {
  const checkBalance = async (req: Request | any, res: Response): Promise<any> => {
    const { user }: { user: { id: string } } = req;

    try {
      const balance = await prisma.accounts.findFirst({ where: { user_id: user.id }, select: { balance: true } });
      return res.status(200).json({ status: 'OK', data: balance?.balance });
    } catch (error) {
      return res.status(500).json({ status: 'Internal Server Error' });
    }
  };
 
  const transactionHistory = async (req: Request | any, res: Response): Promise<any> => {
    res.status(200).json({ status: 'OK' });
  };

  return { checkBalance, transactionHistory };
};