// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/jwtService';
import { SUPERUSER_JWT_SECRET, USER_JWT_SECRET } from '../config';

// middleware to verify token for superuser
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token not provided' });
    }

    try {
        const decoded = verifyToken(token,SUPERUSER_JWT_SECRET);
        
        req.body.user = decoded; // Attach superuser data to the request object
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token or Permission denied.' });
    }
};


// middleware to verify token for user
// export const userAuthenticateToken = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Access token not provided' });
//     }

//     try {
//         const decoded = verifyToken(token,USER_JWT_SECRET);
//         console.log("decoded",decoded)
//         req.body.user = decoded; // Attach user data to the request object
//         next();
//     } catch (err) {
//         return res.status(403).json({ message: 'Invalid token or Permission denied.' });
//     }
// };

export const userAuthenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token not provided' });
    }

    try {
        // Attempt to verify using USER_JWT_SECRET
        const userDecoded = verifyToken(token, USER_JWT_SECRET);
        req.body.user = userDecoded; // Attach user data to the request object
        return next(); // Proceed to the next middleware
    } catch (userErr) {
        try {
            // Attempt to verify using SUPERUSER_JWT_SECRET
            const superuserDecoded = verifyToken(token, SUPERUSER_JWT_SECRET);
            req.body.user = superuserDecoded; // Attach user data to the request object
            return next(); // Proceed to the next middleware
        } catch (superuserErr) {
            // Both verifications failed, return an error
            return res.status(403).json({ message: 'Invalid token or Permission denied.' });
        }
    }
};


