import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  dependencies?: any[];
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = {}
): ApiResponse<T> & { refetch: () => Promise<void> } {
  const { immediate = true, dependencies = [] } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// Example usage for CMS data
export function useCmsData() {
  return useApi(
    async () => {
      const response = await fetch('/api/cms');
      if (!response.ok) {
        throw new Error('Failed to fetch CMS data');
      }
      return response.json();
    },
    { immediate: true }
  );
}

// Example usage for Excel data
export function useExcelData() {
  return useApi(
    async () => {
      const response = await fetch('/api/excel');
      if (!response.ok) {
        throw new Error('Failed to fetch Excel data');
      }
      return response.json();
    },
    { immediate: true }
  );
} 