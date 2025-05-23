import { useDispatch } from 'react-redux'
import { newAnecdoteActionCreator } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdoteActionCreator(content))
    console.log('create')
  }
  return (
    <>
    <h2>create new</h2>
      <form onSubmit={createAnecdote} >
        <div><input name='anecdote' /></div>
      <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
