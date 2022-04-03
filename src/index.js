import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from "./app/store";
import {Provider} from "react-redux";
import {fetchUsers} from "./features/users/usersSlice";


const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

store.dispatch(fetchUsers());

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
