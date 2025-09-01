import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

  const sendNotification = (id) => {
    const votedAnecdote = anecdotes.find((a) => a.id === id)
    dispatch(setNotification(`you voted ${votedAnecdote.content}`, 3))
  }

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    sendNotification(id)
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
