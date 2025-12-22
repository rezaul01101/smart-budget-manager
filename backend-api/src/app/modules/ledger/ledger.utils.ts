import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; id: string | number; name: string },
  secret: Secret,
  expiresIn: any
): string => {
  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (
  token: string,
  secret: Secret
): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
