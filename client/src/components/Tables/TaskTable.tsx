import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
    tasks: any
};

const TaskTable = ({tasks}: Props) => {
    const columns = tasks.length > 0 ?  Object.keys(tasks[0]?.details) : []
    const rows = tasks.map((task:any)=> task?.details)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Tasks</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tasks Table</DialogTitle>
        </DialogHeader>
        {tasks.length > 0 && <Table>
          <TableHeader>
            <TableRow>
                {columns.map((key:any , index:number) => (
                    <TableHead key={index} className="w-[100px]">{key}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
                {rows.map((task:any , index: number)=>{
                   return <TableRow key={index}>
                        {columns.map((key:any)=>{
                        return <TableCell key={key} className="font-medium">{task[key]}</TableCell>
                    })}
                    </TableRow>
                })}
             
             
          </TableBody>
        </Table>}
      </DialogContent>
    </Dialog>
  );
};

export default TaskTable;
