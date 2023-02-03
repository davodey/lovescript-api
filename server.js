const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const uri = `mongodb+srv://lovescript:${encodeURIComponent('iV9b6Cld90xllgZM')}@cluster0.gamjxp1.mongodb.net/analysis?retryWrites=true&w=majority`;
// Connect to MongoDB using Mongoose
app.use(express.json());
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

// Define a schema for our data
const userDataSchema = new mongoose.Schema({
	id: String,
	profile: String,
	rating: String
});

// Create a model based on the schema
const User = mongoose.model('User', userDataSchema);

// Routes
app.get('/', (req, res) => {
	res.send('Hello World');
});

app.post('/users', async (req, res) => {
	try {
		const user = new User({
			id: req.body.user.id,
			profile: req.body.user.profile,
			result:  req.body.user.result
		});
		await user.save();
		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
