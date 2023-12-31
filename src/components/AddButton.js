import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as AddIcon } from '../assets/add.svg';
import './AddButton.css'; // Подключите файл стилей

const AddButton = () => {
  return (
    <Link to="/parameter/new" className='floating-button'>
      <AddIcon className='add-icon' />
    </Link>
  );
};

export default AddButton;