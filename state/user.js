import { create } from 'zustand';

export const userStore = create((set) => ({
  isLogin: false, 

  setIsLogin: async (data) => {
    set({ isLogin: data });
  },

}));
