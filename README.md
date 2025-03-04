# Movie App

The Movie App is a web application that allows users to browse and search for movies. Users can view details about a selected movie, add movies to their favorites, and search for movies by title. This README provides an overview of the app's functionality and how to run it.

## Table of Contents
- [Movie App](#movie-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Folder Structure](#folder-structure)
  - [Dependencies](#dependencies)

## Features
- View a list of top-rated movies.
- View the main movie of the day with a dynamic background image.
- Search for movies by title.
- Click on a movie to view its details.
- Add and remove movies from favorites.
- Responsive design for mobile and desktop.

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js: Make sure you have Node.js installed on your system.

### Installation
1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/Layconnn/hngx-task-two.git
    ```
2. Navigate to the project directory:
    ```sh
    cd 'hngx task two'
    ```
3. Install the project dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory of the project and add your API key:
    ```sh
    VITE_APP_API_KEY=YOUR_API_KEY
    ```
    Replace `YOUR_API_KEY` with your actual API key from The Movie Database (TMDb).

## Usage
1. Start the development server:
    ```sh
    npm run dev
    ```
    This will start the app and open it in your default web browser. You can access the app at [http://localhost:5173](http://localhost:5173).

2. Explore the app's features, including browsing top-rated movies, searching for movies, and viewing movie details.

3. To add a movie to your favorites, click the heart icon on the movie card.

4. To view the details of a movie, click on the movie card image.

## Folder Structure
The project structure is organized as follows:
- `src/`: Contains the source code of the React application.
- `Components/`: Contains reusable components used throughout the app.
- `Styles/`: Contains SCSS files for styling the app.
- `Endpoints/`: Contains API endpoint configuration.
- `public/`: Contains public assets and the HTML template.
- `Pages/`: Contains various pages across the app.
- `Router/`: Contains the `router.jsx` file where the pages and movie details re-route you to across the app.

## Dependencies
The app relies on the following dependencies:
- `react`: JavaScript library for building user interfaces.
- `react-router-dom`: Library for managing routing within the app.
- `axios`: HTTP client for making API requests.
- `react-toastify`: Library for displaying toast notifications.
- `node-sass`: SCSS preprocessor for styling.

These dependencies are managed using npm and specified in the `package.json` file.OVIE APP:
The Movie App is a web application that allows users to browse and search for movies. Users can view details about a selected movie, add movies to their favorites, and search for movies by title. This README provides an overview of the app's functionality and how to run it.
