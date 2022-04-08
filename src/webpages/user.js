import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

const User = () => {
    let params = useParams();
    let login = params.login;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    // const [userAddress, setUserAddress] = useState([]);
    // const [userCompany, setUserCompany] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/users/'+login+'/details')
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    setUser(data);
                    setIsLoaded(true);
                    // setUserAddress(data.address);
                    // setUserCompany(data.company);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (user) {
        return (
            <div>
                <h1>{user.login}</h1>
                {/*<div>*/}
                {/*    Email: {user.email}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    Phone: {user.phone}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    Website: {user.website}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    Company: {userCompany.name}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    Address: {userAddress.street}, {userAddress.suite},  {userAddress.city}, {userAddress.zipcode}*/}
                {/*</div>*/}
            </div>
        );
    }
}
export default User;