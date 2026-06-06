import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/database';
import bcrypt from 'bcryptjs';
import { generateJWTAccess } from '../utils/jwt';

export const authController = () => {
  const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const user = await prisma.users.findUnique({ where: { email } });
      if (!user) {
        res.status(401).json({ error: 'Invalid email' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }

      const accessToken = generateJWTAccess({ sub: user.id, role: user.role });
      res.status(200).json({ 
        data: accessToken,
        message: "Login successful" 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  return { login };
}