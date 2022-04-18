import { NavLink } from 'react-router-dom'
import { useAuth } from './auth'

export const Navbar = () => {
  const auth = useAuth()
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline'
    }
  }

  return (
    <nav className='primary-nav'>
      <NavLink to='/' style={navLinkStyles}>
        Home
      </NavLink>
      <NavLink to='/users' style={navLinkStyles}>
        Users
      </NavLink>
      <NavLink to='/profile' style={navLinkStyles}>
        Profile
      </NavLink>
      <NavLink to='/chat' style={navLinkStyles}>
        Chat
      </NavLink>
      {!auth.user && (
        <NavLink to='/login' style={navLinkStyles}>
          Login
        </NavLink>
      )}
    </nav>
  )
}