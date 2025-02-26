# Hello
This is a simple weather-api, based on stack mean, with docker-compose. And Weather data is taken through a third-party REST API - the OpenWeather API. This project realized just for learning MEAN Stack ^^

# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Docker Usage

This section covers the necessary steps to run the application using Docker and Docker Compose.

### Prerequisites

To use Docker for this project, ensure you have Docker and Docker Compose installed:

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

### Build and Run with Docker

1. **Clone the repository**

    Start by cloning the project repository to your local machine:

    ```bash
    git clone https://repository-url
    cd project-directory
    ```

### Using Docker Compose

Alternatively, you can use Docker Compose to build and run your application.

1. **Define services in `docker-compose.yml`**

    Ensure your `docker-compose.yml` file defines the necessary services. Example:

    ```yaml
    version: '3.8'
    services:
      frontend:
        build: .
        ports:
          - "4200:4200"
    ```

2. **Build and Start the Application**

    Use Docker Compose to build and start the service:

    ```bash
    docker-compose build
    ```

    This will build the image (if it's not already built) and start the application.

3. **Access the Application**

    The application should now be accessible at `http://localhost:80/`.

4. **Stopping the Application**

    To stop the application, run:

    ```bash
    docker-compose down
    ```

### Further Help

For more help on the Angular CLI, try `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
