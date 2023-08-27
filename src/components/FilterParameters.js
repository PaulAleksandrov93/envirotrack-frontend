import React, { useState, useEffect } from 'react';
import './FilterParameters.css';


const FilterParameters = ({ filterData, setFilterData }) => {
  // State для выбора ответственного, помещения и даты
  const [selectedResponsible, setSelectedResponsible] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Здесь вы должны загрузить список ответственных и помещений через API
  // и использовать useState для их хранения
  const [responsibles, setResponsibles] = useState([]);
  const [rooms, setRooms] = useState([]);

  // Загрузка данных для ответственных и помещений при монтировании компонента
  useEffect(() => {
    // Здесь загрузите список ответственных и помещений через API
    // и установите их в состояние
  }, []);

  // Обработчик события изменения фильтров
  const handleFilterChange = () => {
    const filters = {
      responsible: selectedResponsible,
      room: selectedRoom,
      date: selectedDate,
    };
    setFilterData(filters);
  };

  return (
    <div className="filter-parameters">
      <select
        value={selectedResponsible}
        onChange={(e) => setSelectedResponsible(e.target.value)}
      >
        <option value="">Выберите ответственного</option>
        {responsibles.map((responsible) => (
          <option key={responsible.id} value={responsible.id}>
            {responsible.name}
          </option>
        ))}
      </select>

      <select
        value={selectedRoom}
        onChange={(e) => setSelectedRoom(e.target.value)}
      >
        <option value="">Выберите помещение</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <button onClick={handleFilterChange}>Применить фильтры</button>
    </div>
  );
};

export default FilterParameters;