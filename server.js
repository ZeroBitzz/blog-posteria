const {app} = require('./app')
const {sequelize} = require('./models')

require('dotenv').config()

sequelize.sync()

const PORT = process.env.PORT || 3090

app.use((err) => {
  console.error(err)
  res.status(500).send('Internal Server Error')
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))