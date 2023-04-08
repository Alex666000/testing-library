import React, {useEffect, useState} from "react";
import "./App.css";
import Search from "src/components/Search/Search";


const data = ["html", "css", "js", "TS", "React"];

function App() {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState(data);


    useEffect(() => {
        setItems(data.filter(el => el.toLowerCase().includes(search.toLowerCase())));
    }, [search]);


    return (
        <div className="App">
            <div className="App-header">
                <Search value={search} onChange={() => setSearch(e.target.value)}>
                    Find course
                </Search>
                <List items={items}/>
            </div>
        </div>
    );
}

export default App;
