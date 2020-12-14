const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

//routes
const authRouters = require('./routes/auth');
const adminRouters = require('./routes/admin/auth');
env.config();
// mogodb connection
//mongodb+srv://root:<password>@cluster0.88gpt.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.88gpt.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
).then(() => {
    console.log('Database connected');
});

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', authRouters);
app.use('/api', adminRouters);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});