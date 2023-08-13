import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ parameter }) => {
  const getTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Link to={`/parameter/${parameter.id}`}>
      <div className="parameters-list-item">
      <h3>Room: {parameter.room.room_number}</h3>
        <p>
          Температура, °C: {parameter.temperature_celsius} | 
          Влажность, %: {parameter.humidity_percentage} | 
          Давление, кПа: {parameter.pressure_kpa} | 
          Pressure, (mmHg): {parameter.pressure_mmhg} | 
          Дата и время: {getTime(parameter.date_time)} | 
          Ответственный: {parameter.responsible.first_name} {parameter.responsible.last_name}
        </p>
      </div>
    </Link>
  );
};

export default ListItem;