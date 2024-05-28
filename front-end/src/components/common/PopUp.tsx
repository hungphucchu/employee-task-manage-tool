import React, { ReactNode } from "react";
import "../../css/common/PopUp.css";

interface PopupProps {
  children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ children }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">{children}</div>
    </div>
  );
};

export default Popup;
