const FilterPersons = (flt, persons) => {
    if (flt !== "" && persons !== undefined){
      return persons.filter(person => 
        person.name.includes(flt))
    } else {
      return persons
    }
}

export default FilterPersons