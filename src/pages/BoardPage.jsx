import React from 'react'

const BoardPage = ({ children }) => {
  return (
    <main className='Board'>
      <div className="container">
        <div className="board__wrapper">
          {children}
        </div>
      </div>
    </main>
  )
}

export default BoardPage