import { useDispatch, useSelector } from 'react-redux'
import { voteActionCreator } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) =>
    state.slice().sort((a, b) => b.votes - a.votes)
  )

  const vote = (id) => {
    dispatch(voteActionCreator(id))
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
