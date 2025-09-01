import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import {initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect ( ()=> {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <Filter />
      <Notification />
      <AnecdoteList /> 
      <AnecdoteForm />
    </div>
  )
}

export default App
