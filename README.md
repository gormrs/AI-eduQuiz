## AI edu quiz
Take home coding assignment

## Intro
AI edu quiz is a web application that leverages the OpenAI API to help students understand articles and test their knowledge. The app allows users to input an article, generates a summary of that article, and creates a quiz based on its content.

## Features
- Generates summaries for user-inputted articles
- Creates quizzes based on the article content
- Responsive design for better user experience


## Technologies
- React
- PHP
- OpenAI API
- TailwindCSS

## Requirements
- PHP
- NPM
- PHP-CURL

## Installation
- Clone the repo
- Run `npm install`
- Create a .env file in the root directory and add the following your OpenAI API key
```OPENAI_KEY= ..... ```
- Run `npm start` to start the development server
- goto `http://localhost:3000/` to view the app
- Run `php -S localhost:8000``in backend folder to start the php server (make sure you have php-curl installed)
- Now you can use the app

## Usage
1. Enter the article text in the text area.
2. Click the "Send inn" button to generate a summary and quiz.
3. Review the generated summary and answer the quiz questions to test your knowledge.
