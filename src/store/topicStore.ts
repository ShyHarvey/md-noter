import { create } from 'zustand'
import { type Topic } from '@prisma/client'

type State = {
    selectedTopic: Topic | null
}

type Actions = {
    setSelectedTopic: (selectedTopic: State['selectedTopic']) => void
}



export const useSelectedTopic = create<State & Actions>((set) => ({
    selectedTopic: null,
    setSelectedTopic: (selectedTopic) => set(() => ({ selectedTopic: selectedTopic })),
}))
