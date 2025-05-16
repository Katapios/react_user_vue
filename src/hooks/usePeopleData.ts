import { useState, useCallback } from 'react';
import { Person } from '../types/person';
import { getPeople, createPerson, updatePerson, deletePerson } from '../services/api';

export const usePeopleData = () => {
    const [person, setPerson] = useState<Person>({ name: "", age: 0, email: "" });
    const [people, setPeople] = useState<Person[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
        total: 0
    });
    const [sortConfig, setSortConfig] = useState({
        field: 'id',
        direction: 'asc'
    });
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPeople = useCallback(async (search: string = '') => {
        setIsLoading(true);
        try {
            const { data, total } = await getPeople({
                page: pagination.page,
                size: pagination.size,
                search,
                sort: sortConfig.field,
                order: sortConfig.direction
            });

            setPeople(data);
            setPagination(prev => ({ ...prev, total }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка загрузки');
        } finally {
            setIsLoading(false);
        }
    }, [pagination.page, pagination.size, sortConfig]);

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchPeople(term);
    }, [fetchPeople]);

    const handleSort = useCallback((field: string) => {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPerson(prev => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) || 0 : value
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updatePerson(editingId, person);
            } else {
                await createPerson(person);
            }
            setPerson({ name: "", age: 0, email: "" });
            setEditingId(null);
            await fetchPeople(searchTerm);
        } catch (err) {
            setError('Ошибка сохранения');
        }
    }, [editingId, person, searchTerm, fetchPeople]);

    const handleDelete = useCallback(async (id: number) => {
        if (!window.confirm('Вы уверены?')) return;
        try {
            await deletePerson(id);
            if (people.length === 1 && pagination.page > 1) {
                setPagination(prev => ({ ...prev, page: prev.page - 1 }));
            } else {
                await fetchPeople(searchTerm);
            }
        } catch (err) {
            setError('Ошибка удаления');
        }
    }, [people.length, pagination.page, searchTerm, fetchPeople]);

    return {
        people,
        person,
        editingId,
        error,
        isLoading,
        pagination,
        handleSearch,
        handleSort,
        handleChange,
        handleSubmit,
        handleDelete,
        setEditingId
    };
};
