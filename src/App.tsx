import React, { useContext } from "react";
import usePeopleData from "./hooks/usePeopleData";
import { ThemeProvider, ThemeContext } from "./contexts/ThemeContext";

const PeopleList: React.FC = () => {
    const {
        people,
        loading,
        searchTerm,
        sortConfig,
        setSearchTerm,
        setSortConfig,
        fetchPeople,
    } = usePeopleData();

    const handleSort = () => {
        setSortConfig({
            key: "name",
            direction: sortConfig.direction === "asc" ? "desc" : "asc",
        });
    };

    return (
        <div>
            <h1>People</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSort}>Sort</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {people
                        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .sort((a, b) =>
                            sortConfig.direction === "asc"
                                ? a.name.localeCompare(b.name)
                                : b.name.localeCompare(a.name)
                        )
                        .map(person => (
                            <li key={person.id}>
                                {person.name} — {person.email}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

const App: React.FC = () => {
    const theme = useContext(ThemeContext);

    return (
        <ThemeProvider>
            <div className={`app ${theme?.theme || "light"}`}>
                <PeopleList />
            </div>
        </ThemeProvider>
    );
};

export default App;
