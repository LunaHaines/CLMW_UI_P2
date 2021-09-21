# Team Manager UI
This project is the front-end of a full stack application. You can find the API here: https://github.com/ColbyDub/CLMW_api_p2

## Project Description
This application provides a place for coaches, players, and recruiters to create and manage teams. Recruiters and coaches aid in adding new players to a team. Coaches can also manage their team. Players, on the other hand, can use the app to participate in team activities.

## Technologies Used
* React
* TypeScript
* Material UI
* AWS CodeBuild
* AWS CodePipeline
* AWS S3
* Jest
* Enzyme

## Features

### Players
* Register a new account
* Log in
* Add skills and sports to their profile
* Remove skills and sports from their profile
* Accept invites from coaches
* View workouts assigned to them
* Mark workouts as completed

### Coaches
* Register a new account
* Log in
* Invite players to their team
* Assign team players to positions
* Search for workouts
* Assign workouts to their team
* Remove players from their team

### Recruiters
* Register a new account
* Log in
* Rate a player’s skills

## Getting Started
git clone https://github.com/LunaHaines/clmw_ui_p2.git

After cloning the repository, run npm install to install the necessary dependencies. 

This project leverages 2 APIs, information for each of which is included in [team-manager-client.ts](https://github.com/LunaHaines/clmw_ui_p2/blob/main/src/remote/team-manager-client.ts) and [exercisedb-client.ts](https://github.com/LunaHaines/clmw_ui_p2/blob/main/src/remote/exercisedb-client.ts). Replace the URL and/or API key with ones relevant to where you'll be communicating with.

## Usage
Run `npm start` to run the application for development purposes.
When unit testing, use `npm test` for general use and `npm test -- --coverage --watchAll` to run all tests with coverage.
A secret pin is required to register as a Coach or Recruiter

## Contributors
Luna Haines
Mitchell Panenko
Bill Thomas
Colby Wall
