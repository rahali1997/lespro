import React,{useContext} from 'react'
import { IconButton } from '@material-ui/core'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from 'react-router-dom'
import AuthContext from '../../AuthContext'

const MenuUser = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history=useHistory()
    const userAuth=useContext(AuthContext)

    const logout=()=>{
        setAnchorEl(null);
        localStorage.clear()
        userAuth.setState(false)
        history.push('/')
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton className="navbar__menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Avatar src={`/images/profile.png`} />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}         >
                <Link className="Link" to="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                <Link className="Link" to="/demande"><MenuItem onClick={handleClose}>Mes demandes</MenuItem></Link>
                <Link className="Link" to="/login"><MenuItem onClick={logout}>Deconnexion</MenuItem></Link>
            </Menu>
        </>
    )
}

export default MenuUser