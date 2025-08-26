import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    action: '',
    text: ''
  },
  reducers: {
    setNotification(state, action) {
        const notification  = {
            action: action.payload.action,
            text: action.payload.text
        }
      return notification 
    },
    removeNotification() {
        return {action: '', text: ''} 
    }
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
