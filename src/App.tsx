import { PersonTable } from './components/PersonTable/PersonTable';
import { PersonForm } from './components/PersonForm/PersonForm';
import { ErrorBanner } from './components/ErrorBanner/ErrorBanner';
import { ThemeProvider } from './contexts/ThemeContext';
import { usePeopleData } from './hooks/usePeopleData';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';

export function App() {
    const {
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
        setEditingId,
        fetchPeople,
        searchTerm,
        sortConfig
    } = usePeopleData();

    return (
        <ThemeProvider>
            <div className="container">
                <header className="header">
                    <h1>Список пользователей</h1>
                    <ThemeToggle />
                </header>

                <ErrorBanner error={error} />

                <main className="main-content">
                    <section className="card user-grid-container">
                        <PersonTable
                            people={people}
                            isLoading={isLoading}
                            pagination={pagination}
                            onSearch={handleSearch}
                            onSort={handleSort}
                            onDelete={handleDelete}
                            onEdit={(p) => setEditingId(p.id || null)}
                            searchTerm={searchTerm}
                            fetchPeople={fetchPeople}
                            sortConfig={sortConfig}
                        />
                    </section>

                    <section className="card user-form">
                        <PersonForm
                            person={person}
                            editingId={editingId}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            onCancel={() => setEditingId(null)}
                        />
                    </section>
                </main>
            </div>
        </ThemeProvider>
    );
}
