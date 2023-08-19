import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {name} = useContext(AuthContext)
  return (
    <div className='app-header'>
        <h1>Журнал регистрации параметров окружающей среды</h1>
        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/login'>Login</Link>

        {/* <p>Hello {name}</p> */}
    </div>
  )
}

export default Header