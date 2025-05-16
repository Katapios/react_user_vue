import { Pagination } from '../Pagination/Pagination';
import { PersonTableHeader } from './PersonTableHeader';
import { PersonTableRow } from './PersonTableRow';
import { SearchInput } from '../SearchInput/SearchInput';
import { Loader } from '../Loader/Loader';
import { NoData } from '../NoData/NoData';
import { Person } from '../../types/person';

type PersonTableProps = {
    people: Person[];
    isLoading: boolean;
    pagination: {
        page: number;
        size: number;
        total: number;
    };
    onSearch: (term: string) => void;
    onSort: (field: keyof Person) => void;
    onDelete: (id: number) => void;
    onEdit: (person: Person) => void;
    searchTerm: string;
    fetchPeople: (search?: string) => Promise<void>;
    sortConfig: {
        field: keyof Person;
        direction: 'asc' | 'desc';
    };
};

export const PersonTable = ({
                                people,
                                isLoading,
                                pagination,
                                onSearch,
                                onSort,
                                onDelete,
                                onEdit,
                                searchTerm,
                                fetchPeople,
                                sortConfig
                            }: PersonTableProps) => {
    return (
        <>
            <div className="grid-header-row">
                <div>
                    <h2>Текущие пользователи</h2>
                    <SearchInput onSearch={onSearch} />
                </div>
                <div className="total-items">Всего: {pagination.total}</div>
            </div>

            {isLoading ? (
                <Loader />
            ) : people.length === 0 ? (
                <NoData onRefresh={() => fetchPeople(searchTerm)} />
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="user-table">
                            <PersonTableHeader onSort={onSort} sortConfig={sortConfig} />
                            <tbody>
                            {people.map(person => (
                                <PersonTableRow
                                    key={person.id}
                                    person={person}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={pagination.page}
                        itemsPerPage={pagination.size}
                        totalItems={pagination.total}
                        onChangePage={(page) => console.log('Page changed to:', page)}
                        onChangeSize={(size) => console.log('Size changed to:', size)}
                    />
                </>
            )}
        </>
    );
};
