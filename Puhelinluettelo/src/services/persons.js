import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

  const getAll = () => {
    return axios.get(baseUrl)
  }

  const newPersonToDb = (person) => {
    return axios
    .post(baseUrl, person)
  }

  const removePersonFromDb = (id) => {
    axios
    .delete(`${baseUrl}/${id}`)
    .then(response => {
      console.log(response)
    })
  }

  const modifyPersonInDb = (person) => {
    return axios
    .put(`${baseUrl}/${person.id}`, person)
  }

  export default { getAll, newPersonToDb, removePersonFromDb, modifyPersonInDb }