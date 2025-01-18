'use client';
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { IUSER, useAppStore } from '@/store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import AddAgentForm from '../Forms/AddAgentForm';
import UploadForm from '../Forms/UploadForm';
import axios from 'axios';
import AgentCard from '../Cards/AgentCard';

type Props = {}

const Dashboard = (props: Props) => {
  const {user , setUser , setAgents , agents , csvData} = useAppStore((state) => state)
  // console.log("user from dashboard" , csvData)
  const router = useRouter();
  const Logout = () => {
    Cookies.remove('authTOKEN')
    setUser({} as IUSER)
    router.push('/')
  }

  useEffect(() => {
    (async()=>{
      if(user._id){
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/agents/${user._id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('authTOKEN')}`,
          }
        })

        console.log("res.data.agents" , res)
        if(res.data.success){
          setAgents(res?.data?.agents)
        }
      }
    })()
  }, [])
  
  

  return (
   <>
     <nav className='text-3xl font-bold border bg-gray-300 px-3 py-3 flex justify-between'>
        <h1>Dashboard</h1>
        <div className="flex gap-4">
            <UploadForm/>
            <AddAgentForm/>
            <Button variant="outline" onClick={Logout}>Logout</Button>
        </div>
    </nav>

    <div className="p-3 flex gap-3 flex-wrap">
      {agents.map((agent , index) => (
        <AgentCard 
          key={index}
          userName={agent.name}
          userEmail={agent.email}
          tasks={agent.tasks}
        />
      ))}
    </div>
   </>
  )
}

export default Dashboard