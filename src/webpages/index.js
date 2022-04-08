import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from './home';
import Home2 from './home2';
import User from './user';
import PostApp from "./postApp";

const Webpages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home2/>}/>
                <Route path='/user/:login' element={<User/>}/>
                <Route path='/posts' element={<PostApp/>}/>
            </Routes>
        </BrowserRouter>
    );
};
export default Webpages;