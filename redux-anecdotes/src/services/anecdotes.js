import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const vote = async (id) => {
  const updateURL = `${baseUrl}/${id}`
  const { data } = await axios.get(updateURL)
  const updatedAnecdote = { ...data, votes: data.votes + 1 }
  const response = await axios.put(updateURL, updatedAnecdote)
  return response.data
}

export default { getAll, createNew, vote }
