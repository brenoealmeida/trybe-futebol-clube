import jwt = require('jsonwebtoken');
import IUser from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'senha_secreta';

const configJWT: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1h' };

const generateToken = (payload: IUser) => jwt.sign(payload, JWT_SECRET, configJWT);

const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);

export default generateToken;
export { verifyToken };
