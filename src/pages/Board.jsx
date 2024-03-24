import React, { useEffect, useState } from 'react'

const Board = ({ children }) => {
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

export default Board