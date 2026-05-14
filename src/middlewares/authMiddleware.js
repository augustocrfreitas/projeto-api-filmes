import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        const payload = jwt.verify(token, secret);
        req.user = payload;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Acesso negado', erro: error.message });
    }
};

export default authMiddleware;
