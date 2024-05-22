import { create } from "zustand";
import { persist } from "zustand/middleware";

const agentStore = create(
  persist(
    (set) => ({
      agent: null,
      setAgent: (newAgent) => set({ agent: newAgent }),
      clearAgent: () => set({ agent: null }),
    }),
    {
      name: "agentStore",
      Storage: () => localStorage,
    }
  )
);

export default agentStore;
