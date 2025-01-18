import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import TaskTable from '../Tables/TaskTable';


interface AgentCardProps {
    userName: string;
    userEmail: string;
    tasks: any;
  }

const AgentCard: React.FC<AgentCardProps> = ({ userName, userEmail, tasks }) => {
    return (
      <Card className="w-72 border shadow-lg">
        <CardHeader>
          <div className="text-xl font-semibold">{userName}</div>
          <div className="text-sm text-gray-500">{userEmail}</div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-md">
            <strong>Tasks:</strong> {tasks.length}
          </div>
          <TaskTable tasks={tasks}/>
        </CardContent>
      </Card>
    );
  };
  
  export default AgentCard;