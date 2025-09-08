import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)
export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

export const addAnecdote = (content) => {
  const newAnecdote = { content, id: getId(), votes: 0 }
  return axios.post(baseUrl, newAnecdote).then((res) => res.data)
}

export const voteAnecdote = (updatedAnecdote) => {
  return axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data)
}
