import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import Pagination from "./Pagination";
import api from './services/api';

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    function UserList(props) {
        const {id, login} = props.data;
        return (
            <div className="post">
                <small>{id}</small>
                <Link to={`/user/${login}`} key={login}>{login}</Link>
            </div>
        );
    }

    useEffect(() => {
        loadUsers();
    });

    function loadUsers() {
        console.log('loadUsers()...')
        api.get(`?since=0`)
            .then(response => {
                console.log(response)
                let data = response.data;
                setIsLoaded(true);
                setUsers(data);
            })
    }

    const memoizedCallback = useCallback(
        async () => {
            const result = await api.get(`?since=0`);

            setUsers(result);
        },
        [],
    );

    function componentDidMount() {
        console.log('teste');
        loadUsers();
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className="post">
                    <small>Teste</small>
                    {/*<Link to={`/user/${login}`} key={login}>{login}</Link>*/}
                </div>
                <Pagination
                    loadUsers={loadUsers()}
                    data={users}
                    // RenderComponent={UserList}
                    // title="User List"
                    pageLimit={5}
                    dataLimit={30}
                />
            </div>
        );
    }
}
export default Home;