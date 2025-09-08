const app = require('./src/app');
const connectDB = require('./src/config/db');
connectDB();


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server Running!');
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});