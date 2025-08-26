import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector( (state) => {
      const action = state.notifications.action
      const text = state.notifications.text
      switch (action) {
        case 'create':
          return `${text} created!` 
        case 'vote':
          return `You voted for ${text}`
        default:
         return  ''
        }
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  
  return (
    <div>
      {notification.length > 0 &&
        <div style={style}>
          {notification}
        </div>
      }
    </div>
  )
}

export default Notification