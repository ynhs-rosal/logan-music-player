# LoganMusicPlayer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

It uses the Spotify's Web APIs to retrieve, play and pause a specific track. In order for this application to run, you would need to supply clientId, clientSecret, userId and activeDevice in the environment file by following Spotify's guide:

Client ID and Client Secret: https://developer.spotify.com/documentation/web-api/tutorials/getting-started
User ID: Go to your account profile in Spotify (https://www.spotify.com/ph-en/account/overview/) and click Edit profile. The Username in your profile is your User ID.
Active Device: Retrieve the ID of the device where Spotify is playing by hitting Get Available Devices API (https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
