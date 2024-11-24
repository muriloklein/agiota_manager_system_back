import jwt from "jsonwebtoken";

const SECRET_KEY = "secret_agiota";

export const generateToken = (user: { id: number; name: string }): string => {
  return jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
    expiresIn: "1h",
  });
};
