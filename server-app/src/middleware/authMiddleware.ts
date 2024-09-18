import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization']; // extract authorization header from incoming HTTP request (* YOU NEED TO ADD THE REQ.BODY FROM THE FRONTEND LATER *)
    const token = authHeader && authHeader.split(' ')[1]; // split at " " Bearer your_jwt_token_here [1] for the second item (the token itself)

    if (token == null) {
        return res.status(401).json({message: "No token provided. Register or login first."});
    };

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) return res.sendStatus(403); // Token invalid

        // Attach user to request object
        (req as any).user = user; // Alternatively: req.user = user; (but we have to do type files)
        next();
    });
};

export default authenticateToken;