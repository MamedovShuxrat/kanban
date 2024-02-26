import React from 'react'

import './footer.scss'

const Footer = ({ baglockCount, finishCount }) => {
    return (
        <div className='footer'>
            <div className="container">
                <div className="footer__wrapper">
                    <div className="result__wrapper">
                        <span className='result__item'>Active tasks: {baglockCount}</span>
                        <span className='result__item'>Finished tasks: {finishCount}</span>
                    </div>
                    <div className="about">
                        Kanban board by Мамедов Шухрат, 2024
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer