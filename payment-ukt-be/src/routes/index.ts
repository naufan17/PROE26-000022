import { Request, Response } from 'express';
import { authorizeBearer } from '../middleware/authorizationMiddleware';
import app from '../index';

import { authValidator } from '../validators/authValidator';

import { authController } from '../controllers/authController';
import { accountController } from '../controllers/accountController';
import { billingController } from '../controllers/billingController';

// Authentication Routes
app.post("auth", authValidator, authController().login);

// Account Routes
app.get("/check-balance", authorizeBearer, accountController().checkBalance);
app.post("/transaction-history", authorizeBearer, accountController().transactionHistory);

// Billing Routes
app.get("/bill-inquiry/:id", authorizeBearer, billingController().billInquiry);
app.post("/bill-pay", authorizeBearer, billingController().billPay);
app.post("/refund", authorizeBearer, billingController().billRefund);

app.get("/list-billing", authorizeBearer, billingController().listBilling);
app.get("/detail-billing/", authorizeBearer, billingController().detailBilling);
app.post("/create-billing", authorizeBearer, billingController().createBilling);
app.put("/update-billing", authorizeBearer, billingController().updateBilling);
app.delete("/delete-billing", authorizeBearer, billingController().deleteBilling);

app.get('/', (error: any, req: Request, res: Response) => {
  res.status(500).json({ status: 'Internal Server Error' });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});