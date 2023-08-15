import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const ParameterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getParameter = useCallback(async () => {
    if (id === 'new') return;
    let response = await fetch(`/backend/parameters/${id}/`);
    let data = await response.json();
    setParameter(data);
  }, [id]);

  let [parameter, setParameter] = useState(null);

  useEffect(() => {
    getParameter();
  }, [getParameter]);

  let createParameter = async () => {
    fetch(`/backend/parameters/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameter),
    });
  };

  let updateParameter = async () => {
    fetch(`/backend/parameters/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameter),
    });
  };

  let deleteParameter = async () => {
    if (parameter !== null) {
      await fetch(`/backend/parameters/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter),
      });
    }
    navigate('/');
  };

  let handleSubmit = async () => {
    console.log('PARAMETER:', parameter);

    if (id !== 'new' && parameter.room === '') {
      await deleteParameter(); // Await the deletion process
    } else if (id !== 'new') {
      await updateParameter(); // Await the update process
    } else if (id === 'new' && parameter !== null) {
      await createParameter(); // Await the creation process
    }

    navigate('/');
  };

  let handleChange = (field, value) => {
    setParameter((prevParameter) => ({ ...prevParameter, [field]: value }));
    console.log('Handle Change:', parameter);
  };

  return (
    <div className='parameter'>
      <div className='parameter-header'>
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== 'new' ? (
          <button onClick={deleteParameter}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      {/* Display and edit Room */}
      <div>
        <label htmlFor='room'>Помещение:</label>
        <input
          type='text'
          id='room'
          value={parameter?.room.room_number || ''}
          onChange={(e) => handleChange('room', e.target.value)}
        />
      </div>
      {/* Display and edit other fields */}
      <div>
        <label htmlFor='temperature_celsius'>Температура, °C:</label>
        <input
          type='number'
          id='temperature_celsius'
          value={parameter?.temperature_celsius || ''}
          onChange={(e) => handleChange('temperature_celsius', e.target.value)}
        />
      </div>
      {/* Add similar input fields for other parameter properties */}
    </div>
  );
}
export default ParameterPage;