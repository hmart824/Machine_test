import { NextFunction, Request, RequestHandler, Response } from "express";
import Agent from "../models/agent.model";
import mongoose from "mongoose";


export const createAgent = async(req: Request, res: Response ,next: NextFunction): Promise<void>  => {
    try{
    const {name, email, password , phone , userId } = req.body;

    const agent = await Agent.findOne({email});
    if(agent){
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Agent already exists",    
        })
        return;
    }

    const newAgent = new Agent({
        name,
        email,
        password,
        phone,
        user: userId,
    });
    await newAgent.save();

   
    
    res.status(200).json({
        statusCode: 200,
        success : true,
        message: "Login successful",
        agent: {...newAgent.toObject() , tasks:[]}
    });
    }catch(error){
        console.log(error)
    }
};

export const getAgents = async(req: Request, res: Response ,next: NextFunction): Promise<void>  => {
    try{
    const {userId } = req.params;
    console.log("userId" , userId)

    const agents = await Agent.aggregate([
        {$match: { user: new mongoose.Types.ObjectId(userId) }},
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "agent",
                as: "tasks"
            }
        },
        {
            $addFields:{
                tasks: {$ifNull: ["$tasks", []]}
            }
        }
    ])

    console.log("$$$$$$$$$$$" , agents)
    if(!agents){
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Agent not exists",    
        })
        return;
    }

   

    res.status(200).json({
        statusCode: 200,
        success : true,
        message: "Agents retrived successfully",
        agents
    });
    }catch(error){
        console.log(error)
    }
};