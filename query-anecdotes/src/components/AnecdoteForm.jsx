import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = ({ createAnecdote }) => {

  const [notification, notify] = useContext(NotificationContext)
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote(content)
    // notify({type: 'CREATED', payload: content})
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
