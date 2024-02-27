import React from 'react'


const Footer = ({ data }) => {
    if (!data) {
        return null
    }
    return (
        <div className='footer'>
            <div className="container">
                <div className="footer__wrapper">
                    <div className="result__wrapper">
                        <span className='result__item'>Active tasks: {data.backlogCount}</span>
                        <span className='result__item'>Finished tasks:  {data.finishCount}</span>
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