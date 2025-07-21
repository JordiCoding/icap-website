import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { CmsData } from '../types/cms';

interface ExcelData {
  [key: string]: unknown;
}

interface AppState {
  // Loading states
  isLoading: boolean;
  isCmsLoading: boolean;
  isExcelLoading: boolean;
  
  // Data states
  cmsData: CmsData | null;
  excelData: ExcelData | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setCmsLoading: (loading: boolean) => void;
  setExcelLoading: (loading: boolean) => void;
  setCmsData: (data: CmsData | null) => void;
  setExcelData: (data: ExcelData | null) => void;
  
  // Async actions
  fetchCmsData: () => Promise<void>;
  fetchExcelData: () => Promise<void>;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Initial state
      isLoading: false,
      isCmsLoading: false,
      isExcelLoading: false,
      cmsData: null,
      excelData: null,
      
      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setCmsLoading: (loading) => set({ isCmsLoading: loading }),
      setExcelLoading: (loading) => set({ isExcelLoading: loading }),
      setCmsData: (data) => set({ cmsData: data }),
      setExcelData: (data) => set({ excelData: data }),
      
      // Async actions
      fetchCmsData: async () => {
        set({ isCmsLoading: true });
        try {
          // API call will go here
          const data = await fetch('/api/cms');
          const result = await data.json();
          set({ cmsData: result, isCmsLoading: false });
        } catch (error) {
          console.error('CMS fetch error:', error);
          set({ isCmsLoading: false });
        }
      },
      
      fetchExcelData: async () => {
        set({ isExcelLoading: true });
        try {
          // Excel processing will go here
          const data = await fetch('/api/excel');
          const result = await data.json();
          set({ excelData: result, isExcelLoading: false });
        } catch (error) {
          console.error('Excel fetch error:', error);
          set({ isExcelLoading: false });
        }
      },
    }),
    {
      name: 'app-store', // For Redux DevTools
    }
  )
); 