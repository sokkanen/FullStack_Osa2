const PersonAlreadyAdded = (persons, newName) => (
    persons.map(person => person.name).includes(newName)
)

export default PersonAlreadyAdded
