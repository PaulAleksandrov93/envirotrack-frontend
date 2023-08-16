import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton'

const ParametersListPage = () => {
    const [parameters, setParameters] = useState([]);

    useEffect(() => {
        getParameters();
    }, []);

    const getParameters = async () => {
        try {
            const response = await fetch('http://localhost:8000/backend/parameters/');
            const data = await response.json();
            setParameters(data);
        } catch (error) {
            console.error('Error fetching parameters:', error);
        }
    };

    return (
        <div>
            <div className='parameters-list'>
                {parameters.map((parameter, index) => (
                    <ListItem key={index} parameter={parameter} /> 
                ))}
            </div>
            <AddButton />
        </div>
    );
};

export default ParametersListPage;