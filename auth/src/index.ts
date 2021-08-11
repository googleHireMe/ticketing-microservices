import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/', (res, req) => {
	req.send({'test': true});
})

app.listen(3000, () => {
	console.log('Listening on port 3000');
})
