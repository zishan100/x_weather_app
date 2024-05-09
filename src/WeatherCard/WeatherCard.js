import React from 'react'

export default function Card({props,val}) {
  return (
    <div className='weather-card' >
        <h3>{props}</h3>
        <p>{val}</p> 
    </div>
  )
}
