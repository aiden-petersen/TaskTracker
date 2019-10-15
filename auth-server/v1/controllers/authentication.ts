import express from 'express';
import basic_auth from 'basic-auth';
import User, { IUser } from '../models/user';

export function register(req: express.Request, res: express.Response){
    const credentials = basic_auth(req);
    if (credentials){
        let user = new User();
        user.username = credentials.name;
        user.setPassword(credentials.pass);
        
        user.save((err: string) => {
            if (err) {
                res.status(403).json({message: "error", error: err});
            } else {
                res.status(201).json({token: user.generateToken()});
            }
        });
    } else {
        res.status(403).json({message: "Header basic auth not provided"});
    }
}

export function login(req: express.Request , res: express.Response){
    const credentials = basic_auth(req);
    if (credentials){
        User.findOne({username: credentials.name}, (err: string, user: IUser) => {
            if (err) {
                res.status(403).json({message: "error", error: err});
            } else {
                if (user.isCorrectPassword(credentials.pass)){
                    res.status(200).json({token: user.generateToken()});
                } else {
                    res.status(403).json({message: "incorrect password"});
                }
            }
        });
    } else {
        res.status(403).json({message: "Header basic auth not provided"});
    }
}
