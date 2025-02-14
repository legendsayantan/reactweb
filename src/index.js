import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PixPact from './routed/PixPact';
import reportWebVitals from './reportWebVitals';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
            <Router>
                <Routes>
                    <Route path="/pixpact" element={<PixPact />} />
                    <Route path="/*" element={<App />} />
                </Routes>
            </Router>
        </DevSupport>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
