import create from 'zustand';

interface ChatbotState {
  chatLog: string[] | null;
  setChatLog: (chat: string[] | null) => void;
  //   setStatus: (status: boolean[]) => void
}

export const useChatbotStore = create<ChatbotState>((set) => ({
  chatLog: null,
  setChatLog: (chat) =>
    set((state) => ({
      chatLog: chat,
      status: chat ? Array(chat.length).fill(false) : [],
    })),
}));
