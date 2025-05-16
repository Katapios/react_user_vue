import { Person } from '../../types/person';

type PersonTableHeaderProps = {
    onSort: (field: keyof Person) => void;
    sortConfig: {
        field: keyof Person;
        direction: 'asc' | 'desc';
    };
};

export const PersonTableHeader = ({ onSort, sortConfig }: PersonTableHeaderProps) => {
    const getSortIndicator = (field: keyof Person) => {
        if (sortConfig.field !== field) return null;
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    return (
        <thead>
        <tr>
            <th onClick={() => onSort('id')} className={sortConfig.field === 'id' ? 'sort-active' : ''}>
                ID {getSortIndicator('id')}
            </th>
            <th onClick={() => onSort('name')} className={sortConfig.field === 'name' ? 'sort-active' : ''}>
                Имя {getSortIndicator('name')}
            </th>
            <th onClick={() => onSort('age')} className={sortConfig.field === 'age' ? 'sort-active' : ''}>
                Возраст {getSortIndicator('age')}
            </th>
            <th onClick={() => onSort('email')} className={sortConfig.field === 'email' ? 'sort-active' : ''}>
                Email {getSortIndicator('email')}
            </th>
            <th>Действия</th>
        </tr>
        </thead>
    );
};
