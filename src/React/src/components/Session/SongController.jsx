import { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import "../../Styling/glasseffect.css"
import "../../Styling/textinput.css"
function SongController(){
    const closingTime=  () => {
        fetch("http://127.0.0.1:5000/closing_time")
    }
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]); // State to store search results


    const handleChange = (event) => {
    setSearchTerm(event.target.value);
    } ;

    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
        const response = await axios.get(`http://127.0.0.1:5000/search_song/${searchTerm}`);
        // Handle successful response from the API here
        console.log(response.data); // Example: log the received data
        setSearchResults(response.data);
        } catch (error) {
        console.error("Error fetching songs:", error);
        // Handle errors during the API call here
    }
  };

        return (
        <div className="glass">
            <form onSubmit={handleSearch}>
            <input type="text" placeholder="Search for a song..." onChange={handleChange} value={searchTerm} className="input_text"/>
            <button type="submit">Search</button>
            <button onClick={closingTime}>Closing Time</button>
            </form>
            <div className="scroll">
            {searchResults.length > 0 && <SearchResults songs={searchResults} />}
            </div>
        </div>
        );

};

export default SongController;