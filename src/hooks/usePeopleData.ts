import { useEffect, useState } from "react";

type SortDirection = "asc" | "desc";

interface SortConfig {
    key: string;
    direction: SortDirection;
}

interface Person {
    id: number;
    name: string;
    email: string;
}

interface Pagination {
    page: number;
    size: number;
    total: number;
}

const usePeopleData = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, size: 10, total: 0 });
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" });

    const fetchPeople = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/people");
            const data = await response.json();

            setPeople(data);
            setPagination(prev => ({
                page: prev.page,
                size: prev.size,
                total: data?.length || 0,
            }));
        } catch (error) {
            console.error("Error fetching people:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPeople();
    }, []);

    return {
        people,
        loading,
        pagination,
        searchTerm,
        sortConfig,
        setSearchTerm,
        setSortConfig,
        fetchPeople,
    };
};

export default usePeopleData;
