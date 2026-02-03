import { useTaskContext } from "../context/TaskContext";

function FilterControls() {
    const { filter, SearchTerm, setFilter , setSearchTerm , undoAction, canUndo } = useTaskContext();
    

    return(
        <div className="filter-controls">
        
            <div className="search-section">
                <input type="text" placeholder="Search tasks..." value={SearchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input"/>
            </div>
            <div className="filter-section">
                <label >Filter:</label>
                <div className="filter-buttons">
                    {['all','pending','completed'].map( filterValue =>
                    <button key={filterValue} onClick={() => setFilter(filterValue)}
                    className={filter === filterValue ? 'active' : ''} >
                        {filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}
                    </button> 
                    )}
                </div>
            </div>

            <div className="action-section">
                <button disabled={!canUndo} onClick={undoAction} className="undo-btn">
                    Undo
                </button>
            </div>
        </div>
    );
}

export default FilterControls