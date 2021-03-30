## TL;DR
- Install [NodeJS LTS](https://nodejs.org/en/download/)
- Run `npm install -g firebase-tools`
- Run `firebase login`

Noteable Commands:
- `firebase deploy` - Deploy web application to production
- `firebase emulators:start` - Test web application locally [https://localhost:5000](https://localhost:5000)

*Make these commands are run in the projects root directory*

Read more here [/docs/FIREBASE.md](/docs/FIREBASE.md)


## Setting up Firebase-Tools
1. Using Firebase CLI requires you to install [NodeJS LTS](https://nodejs.org/en/download/)
2. Install the firebase-tools modules using the command `npm install -g firebase-tools`
3. Login into firebase using the `firebase login` command.

Please refer to the source [firebase-tools documentations](https://firebase.google.com/docs/cli#install_the_firebase_cli) for further assistance.

### Setting up the development environment
This will generate the development environment for Firebase Hosting. These commands should be run in the projects root folder.

**You are not required to read this section. It is already been generated in the initial commit, however for documentation and awareness purposes feel free to read.**

1. Initialize the firebase project using `firebase init` 
2. Using the arrow keys navigate to `( ) Hosting: Configure and deploy Firebase Hosting sites` press space to select it then enter to confirm.
3. We will be using a existing GCP/Firebase project so select `> Use an existing project`.
4. Select the project `> group-01-match-making-co-78d4c (group-01-match-making-cosc2408)` by using the arrow keys then press enter.
5. You will be promted about a `public directory` and since we will be using `/public` so just press enter.
6. It will ask if the app is a single page application. It is so yress Y and then enter to confirm.
7. Finally it will ask `Set up automatic builds and deploys with GitHub?` just press enter (N).
   
## Deploying to Firebase
This should only be used on production releases. Refer to [Local Testing](#local-testing) for non-production testing.

To deploy to Firebase use the command `firebase deploy`. Doing so will deploy the files inside of the (/public)[/public]. The file governing the deployment rules is [/firebase.json](/firebase.json).

## Notes 
This project uses free tier please read the [pricing guide](https://firebase.google.com/pricing) to understand our limitations. 

Noteworthy limitations:
  - [x] Storage: 10 GB
  - [x] Data transfer: 360 MB/day 

Our assinged url: https://group-01-match-making-co-78d4c.web.app/

## Local Testing

Before deploying to the production environment we will want to view and test your changes.

Use the command `firebase emulators:start` to initate local testing.

In order to access the website locally use your browser and navigate to [https://localhost:5000](https://localhost:5000).



ref:
- https://firebase.google.com/docs/cli#install_the_firebase_cli
- https://firebase.google.com/docs/hosting/quickstart
- https://firebase.google.com/pricing 
- https://firebase.google.com/docs/hosting/test-preview-deploy

