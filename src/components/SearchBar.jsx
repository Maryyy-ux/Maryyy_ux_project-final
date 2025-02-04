import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (onSearch) onSearch(query);
    };

    return (
        <div style={{ display: "flex", gap: "20px 10px" }}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <button onClick={handleSearch} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#0073e6", color: "white", border: "none" }}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
