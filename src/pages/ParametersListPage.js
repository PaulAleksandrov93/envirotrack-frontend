import React, { useState, useEffect, useContext } from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton'
import AuthContext from '../context/AuthContext';

const ParametersListPage = () => {
    const [parameters, setParameters] = useState([]);
    const { authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        getParameters();
    }, []);

    const getParameters = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/parameters/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + String(authTokens.access)
                }
            });
            const data = await response.json();

            if(response.status === 200){
                setParameters(data);
            }else if(response.useState === 'Unauthorized'){
                logoutUser()
            }

            
        } catch (error) {
            console.error('Error fetching parameters:', error);
            // Обработка ошибки (например, вывод на экран или выполнение дополнительных действий)
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

