const mongoose = require('mongoose')

const socketProject = 'Socket_Project'

mongoose.connect(`mongodb://127.0.0.1:27017/${socketProject}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => {
    console.log(`Hosting: ${socketProject}`)
})
.catch((err) => {
    console.log(`Could not establish connection to: ${socketProject}; ${err}`)
})