import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from './services/api';
import {Loading} from './stylesHome2';

function Home2() {

    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState();
    const pageLimit = 5;

    useEffect(() => {
        loadUsers();
    }, []);

    function loadUsers() {
        console.log('loadUsers()...');
        api.get(`?since=0`)
            .then(response => {
                console.log(response)
                setUsers(response.data);
            })
    }

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
        loadUsers(currentPage);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
        // loadUsers(currentPage);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
        // loadUsers(currentPage);
    }

    // const getPaginatedData = () => {
    //     const startIndex = currentPage * dataLimit - dataLimit;
    //     const endIndex = startIndex + dataLimit;
    //     return data.slice(startIndex, endIndex);
    // };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };


    return (
        <div>
            <div>
                {users.map(user => (
                    <li key={user.login}>
                        <div className="user-details">
                            {/*<img src={user.avatar_url} alt="user.avatar_url" />*/}
                            <small> {user.id}</small>
                            <span>{user.login}</span>
                        </div>
                        <Link to={`/users/${encodeURIComponent(user.login)}`}>
                            Details
                        </Link>
                    </li>
                ))}
            </div>
            <div className="pagination">
                {/* previous button */}
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>

                {/* show page numbers */}
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    className={`next`}
                >
                    next
                </button>
            </div>
        </div>
    );

}

export default Home2;