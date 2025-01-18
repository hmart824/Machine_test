import { NextFunction, Request, Response } from "express";
import File from "../models/files.model";
import fs from "fs";
import csvParser from "csv-parser";
import Agent, { IAgent } from "../models/agent.model";
import Task, { ITASK } from "../models/task.model";

export const upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Use the multer middleware to handle the file upload
    File.uploadedFiles(req, res, async function (err: any) {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(500).json({
          statusCode: 500,
          success: false,
          message: "Failed to upload file",
          error: err.message,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          statusCode: 400,
          success: false,
          message: "No file uploaded",
        });
      }

      const { file } = req;
      const userId = req.body.userId;

      if (!userId) {
        return res.status(400).json({
          statusCode: 400,
          success: false,
          message: "User ID is required",
        });
      }

      try {
        // Parse the CSV file and convert it into an array of objects
        const csvData: any[] = [];

        fs.createReadStream(file.path)
          .pipe(csvParser())
          .on("data", (row:string) => csvData.push(row))
          .on("end", async () => {
            const newFile = await File.create({
              filePath: file.path,
              fileName: file.originalname,
              user: userId,
            });

            const agents = await Agent.find({ user: userId });

            if (!agents) {
              return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Agents not found",
              });
            }
            const agentIds = (agents as unknown as IAgent[]).map((agent: IAgent) => agent._id);
            console.log("agentIds" , agentIds)

            const tasks = csvData.map((data: any , index: number) => {
              const selectedAgentIndex = index % agentIds.length;
              const selectedAgentId = agentIds[selectedAgentIndex];
              return {
                agent: selectedAgentId as IAgent,
                details: data,
                status: "pending",
              }
            })

            console.log("******** tasks ********" , tasks)
            
            const distributedTasks = await Promise.all(
              tasks.map((task: any) => Task.create(task))
            );

            console.log("distributedTasks ++++++++++++++++++++++++++++++>>>>>>>" , distributedTasks)

            return res.status(201).json({
              statusCode: 201,
              success: true,
              message: "File uploaded and parsed successfully",
              file: newFile,
              parsedData: csvData,
              distributedTasks
            });
          })
          .on("error", (err:any) => {
            console.error("CSV Parsing Error:", err);
            return res.status(500).json({
              statusCode: 500,
              success: false,
              message: "Failed to parse the CSV file",
              error: err.message,
            });
          });
      } catch (dbError: any) {
        console.error("Database Error:", dbError);
        return res.status(500).json({
          statusCode: 500,
          success: false,
          message: "Failed to save file details to the database",
          error: dbError.message,
        });
      }
    });
  } catch (error: any) {
    console.error("Error in upload controller:", error);
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};
