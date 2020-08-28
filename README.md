# AIsha - Artificial Intelligence Self Help App

**Contributors**

[Arav Patel](https://github.com/aravzpatel)  

[Stuart Pitcher](https://github.com/stupot1)

[Alex Klink](https://github.com/04alexklink)

[Joanne Chen](https://github.com/Joanne0330)

Olivia Herbert: UI Design

## App Description**

AISHA uses Artificial Intelligence to help people uncover, understand and monitor their emotional health. 
How does it work?

Our users tell AISHA how their day is going in a conversational style, allowing AISHA to translate the text provided into an emotional score through the use of machine learning. Each day this score is recorded and helps to build up the users mood history that they can view through their personalised mood chart.
As AISHA is used over a period of time, this chart begins to paint a picture of how their emotions change, and users can gain insight into what events and thought processes are influencing their feelings. 

With AISHA by your side, you too can learn to better understand your mind, gain greater self-awareness, and ultimately take action.

- We keep track of daily thoughts and events that you tell us about, thus helping you uncover what events and thoughts might be influencing your daily mood

- By gaining greater awareness of this, you can decipher what activities make you feel joy, sadness, fear or anger, and learn how important positive vs negative thoughts are in maintaining your mental health. 

- Can be helpful alongside therapy to keep a record of how your past week went so you know what to discuss with your therapist.

```
Example: 
AISHA: How are you feeling today?

User: I had no energy and felt snappy quite a lot.

AISHA: Your overriding emotion today is that of anger. 

AISHA: Can you list any events or thoughts you had recently that might have influenced this?

User: Stayed up til 2am. Didn't eat breakfast. 

AISHA: Sorry to hear that! We'll keep this stored for you. You are on the path to greater self-awareness!

Action/Insight: Go to bed earlier. Eat breakfast!

```
## Running the app on Heroku:

```
http://projectaishal.herokuapp.com
```

## AIsha is built on the following:

* React
* Flask
* Python 
* [Isear dataset](https://www.unige.ch/cisa/research/materials-and-online-research/research-material/) for emotional analysis and machine training
* PostgresSQL

## Project setup

* `git clone https://github.com/aravzpatel/AIsha.git`
* `cd Aisha`
* `npm install -g yarn`
* `cd aisha-app`
* `npm install`
* ``npm run eject`` - maybe not as part of setup?
* `npm run build`

## To run the app from terminal:
```
cd aisha-app
npm run build
cd ..
cd flask-server
python3 main.py
```

## To run frontend test:
```
cd aisha-app
npm test
```


https://blog.learningdollars.com/2019/11/29/how-to-serve-a-reactapp-with-a-flask-server/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
