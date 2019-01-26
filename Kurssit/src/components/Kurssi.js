import React from 'react'

const Kurssi = ({kurssi}) => {
    return (
        <div>
          <Otsikko nimi={kurssi.nimi}/>
          <Sisalto osat={kurssi.osat}/>
          <Yhteensa osat={kurssi.osat}/>
        </div>
      )
}

const Otsikko = ({nimi}) => {
    return (
        <div>
            <h1>{nimi}</h1>
        </div>
    )
}

const Sisalto = ({osat}) => {
    return (
        <div>
            {osat.map(osa => <Osa key={osa.id} osa={osa}/>)}
        </div>
    )
}

const Osa = ({osa}) => {
    return (
        <div>
           <p>{osa.nimi} {osa.tehtavia}</p> 
        </div>
    )
}

const Yhteensa = ({osat}) => {
    return (
        <div>
            yhteensä {osat.reduce((summa, osa) => (
                summa + osa.tehtavia
            ), 0)} tehtävää
        </div>
    )
}

export default Kurssi