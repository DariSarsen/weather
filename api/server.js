require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const multer = require('multer');
const path = require('path');
const connectDB = require('./config/db'); 
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

// Папка для сохранения загруженных изображений
const uploadDir = path.join(__dirname, 'uploads');
app.use(express.static(uploadDir));


app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:80', 'http://localhost'],
  methods: "*",
  allowedHeaders: ["Content-Type"],
  credentials: true 
}));

// Мультипарт обработка загрузки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Роутер для загрузки изображений
app.post('/upload', upload.array('images', 5), (req, res) => {
    // Пути к загруженным файлам
    const imagePaths = req.files.map(file => file.filename);
    res.json({ imagePaths: imagePaths });
});


const newsRoutes = require('./routes/newsRoutes');
const userRoutes = require('./routes/userRoutes');

connectDB();

const typeDefs = gql`
  type Weather {
    city: String
    country: String
    temperature: Float
    humidity: Int
    windSpeed: Float
    description: String
  }

  type Query {
    getWeatherByCityName(city: String!): Weather
  }
`;

const resolvers = {
  Query: {
    getWeatherByCityName: async (_, { city }) => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
        const { name, main, weather, sys, wind } = response.data;
        return {
          city: name,
          country: sys.country,
          temperature: main.temp,
          humidity: main.humidity,
          windSpeed: wind.speed,
          description: weather.length > 0 ? weather[0].description : null,
        };
      } catch (error) {
        console.error('Error occurred while fetching weather data', error);
        throw new Error('Failed to fetch weather data');
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

app.use('/news', newsRoutes);
app.use('/auth', userRoutes);


async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });


  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  });
}

startServer();

module.exports = app; 