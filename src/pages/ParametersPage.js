import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const ParameterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getParameter = useCallback(async () => {
    if (id === 'new') return;
    let response = await fetch(`/api/parameters/${id}/`);
    let data = await response.json();
    setParameter(data);
  }, [id]);

  let [parameter, setParameter] = useState(null);

  useEffect(() => {
    getParameter();
  }, [getParameter]);

  let createParameter = async () => {
    fetch(`/api/parameters/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameter),
    });
  };

  let updateParameter = async () => {
    fetch(`/api/parameters/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameter),
    });
  };

  let deleteParameter = async () => {
    if (parameter !== null) {
      await fetch(`/api/parameters/${id}/`, {
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
      <div>
        <label htmlFor='room'>Room:</label>
        <input
          type='text'
          id='room'
          value={parameter?.room || ''}
          onChange={(e) => handleChange('room', e.target.value)}
        />
      </div>
      {/* Add more input fields for other parameter properties */}
    </div>
  );
};

export default ParameterPage;