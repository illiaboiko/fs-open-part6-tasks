import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { addAnecdote, getAnecdotes, voteAnecdote } from './requests'

import { useReducer } from 'react'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATED':
      return `You created ${action.payload}`
    case 'VOTED':
      return `You voted for ${action.payload}`
    case 'ERROR':
      return `${action.payload}`
    case 'REMOVE':
      return ''
    default:
      return ''
  }
}

const App = () => {
  // implementing useReducer for notification
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  const notify = ({ type, payload }) => {
    notificationDispatch({ type, payload })
    setTimeout(() => {
      notificationDispatch({ type: 'REMOVE' })
    }, 5000)
  }

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote, content) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notify({ type: 'CREATED', payload: content })
    },
    onError: (error) => {
      if (error.response.status === 400) {
        console.log(error)
        notify({ type: 'ERROR', payload: error.response.data.error })
      }
    },
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteAnecdoteMutation.mutate(updatedAnecdote)
    notify({ type: 'VOTED', payload: anecdote.content })
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 2,
  })

  if (result.isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if (result.isError) {
    console.log(result.error)

    if (result.error.message === 'Network Error') {
      return <div>Anecdote service not available due to problems in server</div>
    }
    return <div>Error: {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notify]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm createAnecdote={newAnecdoteMutation.mutate} />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
