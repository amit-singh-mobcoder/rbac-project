import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/api-error';
import { HttpStatusCodes } from '../utils/http-status-codes';
import { Messages } from '../utils/messages';

const roleMiddleware = (allowedRoles: any[]) => {
    return (req: Request, res: Response, next:NextFunction) => {
        try {
            const data = req.user;
            let role;
            if(data){
                role = data.role;
            }
            if(!allowedRoles.includes(role)){
                throw new ApiError(HttpStatusCodes.FORBIDDEN, Messages.PERMISSION.ACCESS_DENIED);
            }

            next()

        } catch (error) {
            next(error)
        }
    }
}

export default roleMiddleware;