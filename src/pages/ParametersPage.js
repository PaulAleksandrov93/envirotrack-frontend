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
    fetch(`/backend/parameters/update/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameter),
    });
  };

  let deleteParameter = async () => {
    if (parameter !== null) {
      await fetch(`/backend/parameters/delete/${id}/`, {
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
      <div className='parameter-fields'>
        <div className='parameter-field'>
          <label htmlFor='room'>Помещение:</label>
          <input
            type='text'
            id='room'
            value={parameter?.room.room_number || ''}
            onChange={(e) => handleChange('room', e.target.value)}
          />
        </div>
        <div className='parameter-field'>
          <label htmlFor='temperature_celsius'>Температура, °C:</label>
          <input
            type='number'
            id='temperature_celsius'
            value={parameter?.temperature_celsius || ''}
            onChange={(e) => handleChange('temperature_celsius', e.target.value)}
          />
        </div>
        <div className='parameter-field'>
          <label htmlFor='humidity_percentage'>Влажность, %:</label>
          <input
            type='number'
            id='humidity'
            value={parameter?.humidity_percentage || ''}
            onChange={(e) => handleChange('humidity_percentage', e.target.value)}
          />
        </div>
        <div className='parameter-field'>
          <label htmlFor='pressure_kpa'>Давление, кПа:</label>
          <input
            type='number'
            id='pressure_kpa'
            value={parameter?.pressure_kpa || ''}
            onChange={(e) => handleChange('pressure_kpa', e.target.value)}
          />
        </div>
        <div className='parameter-field'>
          <label htmlFor='pressure_mmhg'>Давление, ммРС:</label>
          <input
            type='number'
            id='pressure_mmhg'
            value={parameter?.pressure_mmhg || ''}
            onChange={(e) => handleChange('pressure_mmhg', e.target.value)}
          />
        </div>
        <div className='parameter-field'>
          <label htmlFor='date_time'>Дата и время:</label>
          <input
            type='datetime-local'
            id='date_time'
            value={parameter?.date_time ? parameter.date_time.slice(0, -1) : ''}
            onChange={(e) => handleChange('date_time', e.target.value + 'Z')}
          />
        </div>
      </div>
    </div>
  );
}
export default ParameterPage;