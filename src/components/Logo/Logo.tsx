import React from 'react'
import LogoImg from '../../assets/img/logo.jpeg'
import './logoStyles.scss'

const Logo = () => {
    return (
        <div className="logo">
            este es el componente de logo
            <img src={LogoImg} />
        </div>
    )
}

export default Logo
