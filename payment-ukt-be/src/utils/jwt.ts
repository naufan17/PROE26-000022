import jwt, { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';

export const generateJWTAccess = (payload: JwtPayload): { 
  accessToken: string; 
  expiresIn: number;
  tokenType: string
} => {
  const secretToken: string = process.env.JWT_SECRET_KEY || '';
  const expiredToken: number = Number(process.env.JWT_EXPIRES_IN);
  const options: SignOptions = { 
    expiresIn: expiredToken, 
    algorithm: 'HS256'  
  };
  const token: string = jwt.sign(payload, secretToken, options);

  return {
    accessToken: token,
    expiresIn: Date.now() + expiredToken,
    tokenType: 'Bearer'
  };
};

export const vaLidateJWTAccess = (token: string): any => {
  const secretToken: string = process.env.JWT_SECRET_KEY || '';
  const options: VerifyOptions = { 
    ignoreExpiration: false 
  }
  return jwt.verify(token, secretToken, options);
};