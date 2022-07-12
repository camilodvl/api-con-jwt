import app from './app'
import {getConnection} from './database'

getConnection();
app.listen(3000)


console.log('Server linsten on port', 3000)