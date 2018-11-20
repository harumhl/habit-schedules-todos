# regression-on-stock-market

Tools used
* UI: React.js (Firebase)
* Backend: Spring Boot (Firebase)
* Logic in Server: Python (Heroku)
* Database: Firebase

Components
- UI/Frontend displays the analysis and the forecast chart
- Backend gathers data and triggers the analysis
- Logic analyzes the data and forecasts


Current plan
1. build the backend to gather the data
2. link the backend to trigger the analysis
3. build the logic in server to analyze the data
4. build the frontend to display the data
5. improve the logic to forecast the future cases
6. improve (especially #3-5)


React-app
```
$ npm start
$ npm run build
move the build folder content to public
```

Heroku (https://devcenter.heroku.com/articles/getting-started-with-python)
```
$ git add .
$ git commit
$ git push heroku master (in python folder)
$ heroku open
```

Firebase
```
$firebase deploy
```
