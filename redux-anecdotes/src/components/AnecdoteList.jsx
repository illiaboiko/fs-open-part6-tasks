import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes.slice().sort((a, b) => b.votes - a.votes)
    } else {
      return state.anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .filter((a) => a.content.toLowerCase().includes(state.filter))
    }
  })

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    console.log('vote', id)
  }
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
