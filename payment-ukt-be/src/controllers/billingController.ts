import { Request, Response } from 'express';
import prisma from '../config/database';

export const billingController = () => {
  const billInquiry = async (req: Request | any, res: Response) => {
    const { id } = req.params;

    try {
      await prisma.bills.findFirst({ where: { id }});
      res.status(200).json({ status: 'OK', data: "Bill Inquiry" });
    } catch (error) {
      res.status(404).json({ status: 'Not Found' });
    }
  };

  const billPay = async (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
  };

  const billRefund = async (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
  };

  const listBilling = async (req: Request, res: Response) => {
    try {
      const response = await prisma.bills.findMany({});
      res.status(200).json({ status: 'OK', data: response });
    } catch (error) {
      res.status(404).json({ status: 'Not Found' });
    }
  };

  const detailBilling = async (req: Request | any, res: Response) => {
    const { id } = req.params;

    try {
      const response = await prisma.bills.findFirst({ where: { id }});
      res.status(200).json({ status: 'OK', data: response });
    } catch (error) {
      res.status(404).json({ status: 'Not Found' });
    }
  };

  const createBilling = async (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
  };

  const updateBilling = async (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
  };

  const deleteBilling = async (req: Request | any, res: Response) => {
    const { id } = req.params;

    try {
      const isPaidBilling = await prisma.bills.findFirst({ where: { id, status: 'PAID' }});
      if (isPaidBilling) {
        return res.status(403).json({ status: 'Forbidden', message: 'The billing is already paid' });
      }

      await prisma.bills.delete({ where: { id }});
      res.status(200).json({ status: 'OK' });
    } catch (error) {
      res.status(404).json({ status: 'Not Found' });
    }
  };

  return { 
    billInquiry, 
    billPay, 
    billRefund, 
    listBilling, 
    detailBilling, 
    createBilling, 
    updateBilling, 
    deleteBilling 
  };
};
