import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const HeaderComponent = () => {
    const [isOpen, setIsOpen] = useState(false)

    const openUserMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <header className='header'>
            <div className="container">
                <div className="header__wrapper">
                    <Link to='/' className='header__logo'>
                        Awesome Kanban Board
                    </Link>
                    <div className="user__menu">
                        <div className="user__logo">
                            <img src="/img/user.svg" alt="user-avatar" className="user__img" />
                        </div>
                        <img alt='icon-logo' onClick={openUserMenu} src={isOpen ? '/img/icons/arrow-up.svg' : '/img/icons/arrow-down.svg'} className='user__btn' />
                        {isOpen && <ul className="user__dropdown">
                            <li className="user__item">
                                <span className="user__link">Profile</span>
                            </li>
                            <li className="user__item">
                                <span className="user__link">Log Out</span>
                            </li>
                        </ul>}
                    </div>
                </div>

            </div>
        </header>
    )
}

export default HeaderComponent