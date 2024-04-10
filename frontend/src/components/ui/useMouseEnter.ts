import { useContext } from "react";
import { MouseEnterContext } from "./3d-card"; // Assurez-vous d'exporter MouseEnterContext depuis 3d-card.tsx

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};