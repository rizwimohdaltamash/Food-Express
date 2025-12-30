import React, { createContext, useState, useContext } from "react";

// Create Context
const SidebarContext = createContext();

// Provide Context to Components
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook to Use Context
export const useSidebar = () => useContext(SidebarContext);
