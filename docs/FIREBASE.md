## TL;DR

Setup Firebase CLI
- Install [NodeJS LTS](https://nodejs.org/en/download/)
- Run `npm install -g firebase-tools`
- Run `firebase login`

You can now do cool commands with Firebase in the terminal (Make sure your in the projects root directory). 

Noteable Commands:
- `firebase deploy`

Our project uses [Firebase Free Tier](https://firebase.google.com/pricing)

## Setting up Firebase-Tools
1. Using Firebase CLI requires you to install [NodeJS LTS](https://nodejs.org/en/download/)
2. Install the firebase-tools modules using the command `npm install -g firebase-tools`
3. Login into firebase using the `firebase login` command.

Please refer to the source [firebase-tools documentations](https://firebase.google.com/docs/cli#install_the_firebase_cli) for further assistance.

## Setting up the development environment
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
To deploy to Firebase use the command `firebase deploy`. Doing so will deploy the files inside of the (/public)[/public]. The file governing the deployment rules is [/firebase.json](/firebase.json).

## Notes 
Keep in mind this project uses [free tier](https://firebase.google.com/pricing) so primarily keep in mind:
  - [x] Storage: 10 GB
  - [x] Data transfer: 360 MB/day 
  
Inclusive of these please read through the [other free tier items](https://firebase.google.com/pricing).

Our assinged url: https://group-01-match-making-co-78d4c.web.app/

ref:
- https://firebase.google.com/docs/cli#install_the_firebase_cli
- https://firebase.google.com/docs/hosting/quickstart
- https://firebase.google.com/pricing 

