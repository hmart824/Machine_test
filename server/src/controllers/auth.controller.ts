import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const secretKey = process.env.JWT_SECRET_KEY as string;
export const Login = async(req: Request, res: Response ,next: NextFunction): Promise<void>  => {
    try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400).json({
            message: "Invalid email or password",
        });
        return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch){
        res.status(400).json({
            message: "Invalid email or password",
        });
        return;
    }
    
    const token = jwt.sign(
        { userId: user.id, email: user.email},
        secretKey,
        {
          expiresIn: "7d",
        }
      );

    res.status(200).json({
        statusCode: 200,
        success : true,
        message: "Login successful",
        token,
    });
    }catch(error){
        console.log(error)
    }
};

export const Register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userName, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "User already exists",
            });
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: encryptedPassword,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Registration successful",
            user: newUser,
        });
    } catch (error) {
        next();
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        let user = await User.findById(id);
        if (user) {
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "User found successfully!",
                user
            });
            return;
        }

        res.status(400).json({
            success: false,
            statusCode: 400,
            message: "User not found!",
        });
    } catch (error) {
        next();
    }
};

