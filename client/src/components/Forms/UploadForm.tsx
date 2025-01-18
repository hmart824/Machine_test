"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAppStore } from "@/store";
import Cookies from "js-cookie";

type Props = {};

const UploadForm = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user ,agents, setAgents } = useAppStore((state) => state);
  const [isOpen, setIsOpen] = useState(false); 
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user._id);
    const token = Cookies.get("authTOKEN");

    setUploading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response: file", response);
      setUploading(false);
      if (response?.data.success) {
        const modifiedAgents = agents.map((agent: any) => {
          response?.data?.distributedTasks.forEach((task: any) => {
            if(task.agent === agent._id){
              agent.tasks.push(task)
            }
          })
          return agent
        })

        console.log("modifiedAgents &&&&&&&&&&" , modifiedAgents)
        setAgents(modifiedAgents)


        setIsOpen(false); 
        toast.success("File uploaded successfully!");
        setFile(null);
      }
    } catch (error) {
      setUploading(false);
      setErrorMessage("Failed to upload file. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <Plus />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="file">File</Label>
            <input
              id="file"
              type="file"
              accept=".csv, .xls, .xlsx"
              onChange={handleFileChange}
              className="input input-bordered w-full"
            />
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <Button type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload File"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadForm;
