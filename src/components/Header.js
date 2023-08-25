import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div className='app-header'>
    <h1>Журнал регистрации параметров окружающей среды</h1>
    <nav className="nav-links">
        <Link to='/'>Главная</Link>
        <span> | </span>
        {user ? (
            <p className="logout-link" onClick={logoutUser}>Выйти</p>
        ): (
            <Link to='/login'>Вход</Link>
        )}
    </nav>
    {user && <p className="user-greeting">Привет, {user.username}</p>}
</div>
  )
}

export default Header