# <div align="center"> Recruiter Match Making <br/> [<img src="https://img.shields.io/badge/Firebase-red.svg">](https://firebase.google.com/) [<img src="https://img.shields.io/badge/NodeJS-green.svg">](https://nodejs.org/) </div>

## Getting started for development

- Install [NodeJS LTS](https://nodejs.org/en/download/)
- Run  `npm install`
- Ensure the date in [/firestore.rules](/firestore.rules) has not passed, if it has change it to a later date.

Note thatall data is non persistant unless deployed to Firebase.

### Serving Locally

- Install [Java JDK](https://www.oracle.com/au/java/technologies/javase-downloads.html)
- Install modules by running `npm install`
- To serve the website locally on [https://localhost:5000](http://localhost:5000) run `npm start`

### Docker

```docker build . -t recruiter-match-making```

```docker run --name recruiter-match-making -d -p 5000:5000/udp -p 5000:5000/tcp recruiter-match-making```

Alternativly run using Docker compose instead.

```docker-compose up -d --build```

### Deploying to Firebase

- Ensure the [.firebaserc](/.firebaserc) has your project name.

```json
{
  "projects": {
    "default": "reallycoolrecruitmentsite"
  }
}
```

- Replace the *firebaseConfig* object in [/public/js/index.js](/public/js/index.js) with one provided by firebase.

```js
var firebaseConfig = {
  apiKey: "NjF27EspaPfcLm5Gq4jBUAIzaSyAUYfyiQEAm34",
  authDomain: "recruitermatchmaking.firebaseapp.com",
  projectId: "recruitermatchmaking",
  storageBucket: "recruitermatchmaking.appspot.com",
  messagingSenderId: "7206284245292064529",
  appId: "1:7422:8web:159517930e05c02b90c20f",
  measurementId: "G-64C1ND3RKD"
};
```

- Run `npm login`
- Run `npm deploy`

### More docs

- [Testing](/docs/TESTING.md)
- [Environment Variables](/docs/ENVIRONMENT.md)
- [Firebase](/docs/FIREBASE.md)
- [Contribution](/CONTRIBUTIONS.md)

### Preview

# <div align="center">  ![/docs/img/preview.gif](/docs/img/preview.gif) </div>
