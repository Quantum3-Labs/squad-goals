"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CIDContextType {
  uploadedCIDs: string[];
  addCID: (cid: string) => void;
}

const CIDContext = createContext<CIDContextType | undefined>(undefined);

export const CIDProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedCIDs, setUploadedCIDs] = useState<string[]>([]);

  const addCID = (cid: string) => {
    setUploadedCIDs((prevCIDs) => [...prevCIDs, cid]);
  };

  return (
    <CIDContext.Provider value={{ uploadedCIDs, addCID }}>
      {children}
    </CIDContext.Provider>
  );
};

export const useCID = () => {
  const context = useContext(CIDContext);
  if (context === undefined) {
    throw new Error('useCID must be used within a CIDProvider');
  }
  return context;
};
