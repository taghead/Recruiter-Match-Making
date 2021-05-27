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
2. Using the arrow keys navigate to the following and press space to enable them.
   1. (*) Firestore: Deploy rules and create indexes for Firestore
   2. (*) Functions: Configure and deploy Cloud Functions
   3. (*) Hosting: Configure and deploy Firebase Hosting sites
   4. (*) Emulators: Set up local emulators for Firebase features
3. We will be using a existing GCP/Firebase project so select `> Use an existing project`.
4. Select the project `> group-01-match-making-co-78d4c (group-01-match-making-cosc2408)` by using the arrow keys then press enter.
5. For firebase firestore setup use the default `firestore.rules` and `firestore.indexes.json`.
6. For firebase functions select `Javascript`, set enforce style to `N` and select `Y` for install dependencies.
7. For firebase hosting set the public directory to `/public`.
   1. It will also ask if the app is a single page application. It is so press Y and then enter to confirm.
   2. Finally it will ask `Set up automatic builds and deploys with GitHub?` just press enter (N).
8. For emulators select `Authentication`, `Functions`, `Firestore`, and `Hosting`. 
   1. Make sure to use the default port (9099, 5001, 8080 and 5000).
   2. Select `Y` to enable Emulator UI. Set it to use any port (leave empty) and press `N` for downloading the emulators now.
   
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

