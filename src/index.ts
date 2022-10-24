import { app } from './app'
// start express server

const PORT = 4040

app.listen(PORT, () => {
  console.log(`Server i starting at port :${PORT}`)
})
