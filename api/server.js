require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const port = process.env.PORT || 3000;

// Define GraphQL Schema
const typeDefs = gql`
  type Weather {
    city: String
    temperature: Float
    humidity: Int
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
        const { name, main, weather } = response.data;
        return {
          city: name,
          country: weather.sys.country,
          temperature: main.temp,
          humidity: main.humidity,
          windSpeed: weather.wind.speed,
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
server.start().then(() => {
    // Apply Apollo GraphQL middleware and set the path to /graphql
    server.applyMiddleware({ app, path: '/graphql' });
  
    app.use(cors({
        origin: ['http://localhost:4200', 'http://localhost:80', 'http://localhost'],
        methods: "*",
    }));
  
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
  });