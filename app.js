const express = require('express');
const formData = require("express-form-data");
const os = require("os");
const app = express();

const products = require('./routes/products');
const uploads = require('./routes/uploads');

const options = {
	uploadDir: os.tmpdir(),
	autoClean: true
};

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use('/products', products);
app.use('/uploads', uploads);

app.listen(3000, () => {
    console.log('Server is up and running on port numner ' + 3000);
});