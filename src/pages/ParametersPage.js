import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import AuthContext from '../context/AuthContext';
// import './ParametersPage.css';
import Select from 'react-select';

const ParameterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { authTokens } = useContext(AuthContext);

  const getCurrentUser = async () => {
    try {
      const response = await fetch(
        '/api/current_user/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        }
      );
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getParameter = useCallback(async () => {
    if (id === 'new') return;
    let response = await fetch(
      `/api/parameters/${id}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    setParameter(data);
    setSelectedRoom(data.room);
  }, [id]);

  let [parameter, setParameter] = useState(null);

  const getRooms = useCallback(async () => {
    try {
      let response = await fetch(`/api/rooms/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      }
    );
      let data = await response.json();
      console.log(data); // Добавьте этот console.log для отладки
      setRooms(data); // Убедитесь, что data содержит массив комнат
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  }, []);

  useEffect(() => {
    getParameter();
    getRooms();
  }, [getParameter, getRooms]);

  let createParameter = async () => {
    if (currentUser) {
      const newParameter = { ...parameter, responsible: currentUser.id };
      try {
        const response = await fetch('/api/parameters/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
          body: JSON.stringify(newParameter),
        });
  
        if (response.ok) {
          // Переход на другую страницу, если запрос выполнен успешно
          navigate('/');
        } else {
          // Обработка ошибок, если не удалось создать параметр
          console.error('Failed to create parameter:', response.statusText);
        }
      } catch (error) {
        console.error('Error while creating parameter:', error);
      }
    }
  };

  let updateParameter = async () => {
    fetch(`/api/parameters/update/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(authTokens.access),
      },
      body: JSON.stringify(parameter),
    });
  };

  let deleteParameter = async () => {
    if (parameter !== null) {
      await fetch(`/api/parameters/delete/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
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
          <button onClick={deleteParameter}>Удалить</button>
        ) : (
          <>
            <button onClick={handleSubmit}>Назад</button>
            <button onClick={createParameter}>Создать</button> {/* Добавленная кнопка */}
          </>
        )}
      </div>
      <div className='parameter-fields'>
        <div className='parameter-field'>
          <label htmlFor='room'>Помещение:</label>
          <Select
            options={rooms.map((room) => ({ value: room.id, label: room.room_number }))}
            value={selectedRoom ? { value: selectedRoom.id, label: selectedRoom.room_number } : null}
            onChange={(selectedOption) =>
              setSelectedRoom({ id: selectedOption.value, room_number: selectedOption.label })
            }
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
        {id === 'new' && currentUser && (
          <div className='parameter-field'>
            <label>Создано пользователем:</label>
            <div>{currentUser.first_name} {currentUser.last_name} </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParameterPage;