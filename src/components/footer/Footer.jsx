import React from 'react'


const Footer = ({ backlogCount, finishCount }) => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__wrapper">
                    <div className="result__wrapper">
                        <span className='result__item'>Active tasks: {backlogCount}</span>
                        <span className='result__item'>Finished tasks: {finishCount}</span>
                    </div>
                    <div className="about">
                        Kanban board by Мамедов Шухрат, 2024
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer