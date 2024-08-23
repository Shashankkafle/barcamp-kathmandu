const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const uuid = require('uuid');

const app = express();

// parse body params and attached them to req.body
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use((req, res, next) => {
	req.id = uuid.v4();
	next();
});

app.use((req, res, next) => {
	next(new createHttpError.NotFound());
});

const errorHandler = (err, req, res, next) => {
	res.status(err.statusCode || 500);
	res.send({
		status: err.statusCode || 500,
		success: false,
		error: err.error || err.message,
		stack: process.env.NODE_ENV === 'local' ? err : '',
	});
};
app.use(errorHandler);

const port = Number(process.env.PORT || 3000);

app.listen(port, () => console.log(`Server is running on port ${port}`));
