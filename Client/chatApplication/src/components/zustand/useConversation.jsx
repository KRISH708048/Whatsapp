import {create} from 'zustand';

const useConversation = create((set) => ({
    selectedConversation : null,
    setSelectedConverstaion : (selectedConversation)=>set({selectedConversation}),
    message : [],
    setMessage : (messages) => set({messages})
  }))

export default useConversation;
