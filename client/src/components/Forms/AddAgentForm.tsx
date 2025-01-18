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
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useAppStore } from "@/store";
import Cookies from "js-cookie";



type Props = {};

const AddAgentForm = (props: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const {user , addAgent} = useAppStore((state) => state)
  const [loading, setLoading] = useState(false);
const [isOpen, setIsOpen] = useState(false); 
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setLoading(true);
    const token = Cookies.get("authTOKEN")
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/create-agent`,
        {...formData , userId: user?._id},
        {
            headers: {
                Authorization: `Bearer ${token}`,
              }, 
        }
      );
      if (res?.data?.success) {
        console.log("res from add agent form " , res.data.agent)
        addAgent(res?.data?.agent)
        toast.success("Agent added successfully!");
        setFormData({ name: "", email: "", phone: "", password: "" });
        setIsOpen(false); 
        
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Agent Form</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-6 rounded"
        >
          <h2 className="text-xl font-semibold text-center mb-6">Add Agent</h2>

          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter agent's name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter agent's email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="phone">phone</Label>
            {/* <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter agent's phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            /> */}
            <PhoneInput
                inputProps={{
                    name: 'phone',
                    required: true
                  }}
                country={'in'}
                value={formData.phone}
                onChange={phone => setFormData({ ...formData, phone: phone})}
                />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter agent's password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Adding Agent..." : "Add Agent"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAgentForm;
