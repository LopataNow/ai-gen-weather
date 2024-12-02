# llm-weather-article
`ai-gen-weathechitekurer` is a project designed to generate weather articles using AI. The project leverages machine learning models to analyze weather data and produce coherent and informative articles. This can be particularly useful for news agencies, bloggers, and anyone interested in automating the creation of weather-related content.

## run local database

To run the database, follow these steps:

Navigate to the local directory and run docker compose:
    ```sh
    cd llm-gen-local
    docker compose up -d
    ```

## run backend

To run the backend, follow these steps:

1. Navigate to the backend directory, copy the environment, install dependencies: and run app:
    ```sh
    cd backend-nest
    cp .env.local .env
    npm install
    npm run dev
    ```
This will start the frontend application on `http://localhost:3000`.

## Run Frontend

To run the frontend, follow these steps:

1. Navigate to the frontend directory and install dependencies:
    ```sh
    cd frontend-next
    cp .env.local .env
    npm install
    npm start
    ```

This will start the frontend application on `http://localhost:3001`.
## Features

- **Automated Article Generation**: Uses AI to generate weather articles based on the latest weather data.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Implements CI/CD pipelines to ensure smooth and automated deployment of updates.
- **Serverless Deployment**: Utilizes Google Cloud Run for deploying the application in a serverless environment with autoscaling capabilities.
- **Advanced Language Model**: Generates articles using the Gemini LLM for high-quality, coherent content.

## CI/CD Architecture

The CI/CD architecture for this project includes the following components:

1. **Version Control**: The source code is managed using Git.
2. **Continuous Integration**: Automated tests are run on every commit to ensure code quality.
3. **Continuous Deployment**: Successful builds are automatically deployed to the production environment.

## Google Cloud Run

Google Cloud Run is a fully managed serverless platform that automatically scales your stateless containers. It abstracts away all infrastructure management, allowing you to focus on writing code. Key features include:

- **Autoscaling**: Automatically scales the number of container instances based on incoming traffic.
- **Serverless**: No need to manage servers, as Google Cloud Run handles all infrastructure.
- **Fast Deployment**: Quickly deploy and update your applications with minimal downtime.
- **Integrated Monitoring**: Built-in monitoring and logging to keep track of application performance.

## Article Generation with Gemini LLM

The project leverages the Gemini LLM to generate high-quality weather articles. Key features include:

- **Natural Language Processing**: Uses advanced NLP techniques to produce coherent and contextually accurate articles.
- **Customizable Outputs**: Allows customization of article tone and style to fit different audiences.
- **Real-time Data Integration**: Integrates with real-time weather data sources to ensure articles are up-to-date.
- **Scalability**: Capable of generating a large volume of articles to meet high demand.

## License

This project is licensed under the MIT License.