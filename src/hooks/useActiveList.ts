import { create } from "zustand";
import useActiveChannel from "./useActiveChannel";

interface ActiveListSore {
  members: string[];
  addMember: (member: string) => void;
  removeMember: (member: string) => void;
  setMembers: (members: string[]) => void;
}

export const useActiveList = create<ActiveListSore>((set) => ({
  members: [],
  addMember: (member) =>
    set((state) => ({ members: [...state.members, member] })),
  removeMember: (member) =>
    set((state) => ({ members: state.members.filter((m) => m !== member) })),
  setMembers: (members) => set({ members }),
}));
