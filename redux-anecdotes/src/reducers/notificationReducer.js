import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    writeNotification(state, action) {
      return action.payload 
    },
    removeNotification() {
        return '' 
    }
  },
})

export const setNotification = (message, duration) => {
    return  (dispatch) => {
       dispatch(writeNotification(message)) 
       setTimeout(() => {
            dispatch(removeNotification())
        }, duration * 1000);
    }

} 

export const { writeNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
