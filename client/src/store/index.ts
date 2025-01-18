'use client'
import { create } from "zustand";

export interface IUSER{
    _id: string;
    userName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAGENT{
    tasks: any;
    _id: string | null | undefined;
    name: string;
    email: string;
    password: string;
    phone: number;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}
interface AppState {
  loading: boolean;
  searched: boolean;
  user: IUSER
  agents: IAGENT[]
  csvData: any
}

export interface AppActions {
  setLoading: (loading: boolean) => void;
  setSearched: (searched: boolean) => void;
  setUser: (user: IUSER) => void;
  setAgents: (agents: IAGENT[]) => void;
  addAgent: (agent: IAGENT) => void;
  addCsvData: (csvData: any) => void;

}

export const defaultInitState: AppState = {
  loading: false,
  searched: false,
  user: {} as IUSER,
  agents: [] as IAGENT[],
  csvData: []
};

type Store = AppState & AppActions;

export const useAppStore = create<Store>((set) => ({
  ...defaultInitState,
  setLoading: (loading) => set({ loading }),
  setSearched: (searched) => set({ searched }),
  setUser: (user) => set({ user }),
  setAgents: (agents) => set({ agents }),
  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
  addCsvData: (data) => set((state)=> ({csvData: [...state.csvData, ...data]}))
}));
