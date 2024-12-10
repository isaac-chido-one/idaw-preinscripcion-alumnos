const app = require('./app');
require('./db');

app.listen(9080, () => console.log('Server on port 9080'));
