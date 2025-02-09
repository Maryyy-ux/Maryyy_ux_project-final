// ParentalWarning.jsx
import React from "react";

const ParentalWarning = ({ onClose }) => {
    return (
        <div className="warning-overlay">
            <div className="warning-box">
                <h2>Restricted access for tiny dragons</h2>
                <p>Little dragons only allowed on Kids.</p>
                <img src="/Parental.jpg" alt="Advertencia" className="warning-image" />
                <button onClick={onClose}>Understood</button>
            </div>
        </div>
    );
};

export default ParentalWarning;
