import express from 'express';
import User, { IUser } from '../models/user';

export function register(req: express.Request, res: express.Response){
    if (!req.body.username && !req.body.password){
        res.status(403).json({message: "username and passord not sent"});
    } else {
        let user = new User();
        user.username = req.body.username;
        user.setPassword(req.body.password);
        
        user.save((err: string) => {
            if (err) {
                res.status(403).json({message: "error", error: err});
            } else {
                res.status(201).json({token: user.generateToken()});
            }
        });
    }
}

export function login(req: express.Request , res: express.Response){
    if (!req.body.username && !req.body.password){
        res.status(403).json({message: "username and passord not sent"});
    } else {
        User.findOne({username: req.body.username}, (err: string, user: IUser) => {
            if (err) {
                res.status(403).json({message: "error", error: err});
            } else {
                if (user.isCorrectPassword(req.body.password)){
                    res.status(200).json({token: user.generateToken()});
                } else {
                    res.status(403).json({message: "incorrect password"});
                }
            }
        });
    }
}
