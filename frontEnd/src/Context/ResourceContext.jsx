import React, { createContext, useContext, useState, useEffect } from "react";
import { getResources } from "../api/resourceAPI";

const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getResources();
        setResources(data);
      } catch (error) {
        console.error("Failed to load resources", error);
      }
    })();
  }, []);

  return (
    <ResourceContext.Provider value={{ resources }}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResources = () => useContext(ResourceContext);
