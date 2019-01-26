import React from 'react'

const Person = ({person, handler}) => {
    return (
      <div>
        <li>
        {person.name}  {person.number} 
        <button onClick={() => handler(person)}>poista</button>
        </li>
      </div>
    )
  }

  export default Person