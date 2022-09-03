# CM3050 Mobile Development Final Project

## Introduction

Video demo: [https://www.youtube.com/watch?v=p3Rfab8EipA](https://www.youtube.com/watch?v=p3Rfab8EipA)

This is a basic React Native application that allows the user to manage their petty cash transactions. It has been built with Firebase as the backend which allowed me to quickly build the API and authentication.

The basic features of the application would be to:

- Allow users to sign up, log in, and log out.
- Once logged in, the user should be able to add, edit, and delete petty cash entries
- On main screen, the user should be able to see a list of transactions in their wallet.

Some strech goals:

- Ability to select UI language for the app i.e. the app should have translations for some languages (e.g. English, French, Spanish, etc.)
- Allow users to search for transactions by keyword, date range, or type.
- Ability to attach a photo of an invoice to a transaction.

Highly ambitious goals:

- Have AI scan the photo of the invoice and extract the transaction details.
- Ability to have family members share a wallet and have a joint account.
- Ability to generate certain reports based on the transactions to help users track their spending.

<div style="page-break-after: always;"></div>
## Wireframes

The following wireframes show the basic design and functionality of the application. However, the actual implementation is a little bit improved version of this because I learned some new things along the way as I developed the application and therefore felt that certain earlier decisions I made were not quite right.

![](etc/wireframes.png)

### User flow

The following points briefly describe the user flow of the application:

- When a user launches the app for the first time, they don't see any tabs and they can only navigate between login and signup pages.
- Upon signing up, the user is taken to login page.
- Upon logging in, the app navigates to the main screen which is the wallet page.
- In all forms, the user can submit form if the form is valid, however, if the form is invalid, the user is notified and form submission is stopped.
- Upon actions such as logout, delete transaction, user confirmation is requested and the action is performed only if the user confirms.
- The user is also notified via an alert if an error occurs e.g. if login fails. However the underlying technical details of the error are not shown to the user due to security reasons.

#### Navigation flow
- Unauthenticated user:
    - Login
    - Signup
    - Reset password
- Authenticated user:
    - Wallet: for CRUD operations on petty cash entries.
        - Transaction screen (to add, edit, and delete petty cash entries)
    - User: for current user account information and logout.
        - User detail screen (to see current user account information)
    - Settings: for changing the theme and UI language of the application.

## User feeback

I was only able to get feedback from friends and family, either face to face or via video calls. Unfortunately, I had issues running the application via Expo Snack because Snackager fails to load firebase v9 JavaScript SDK ([GitHub Issue](https://github.com/expo/snack/issues/268)). This meant that I couldn't get feedback from my classmates and other anonymous users.

The following points outline the feedback I received:

- In some cases I didn't use spinners, so the users didn't know if a button press did anything.
- The app started in English language, it should default to the device language on first launch.
- The web based app hangs when alert is displayed.
- The app needs to support a way to reset password.
- Some users wanted the ability to delete their account.
- The theme settings are confusing, it would be a lot simpler to have three options instead of two toggles: light, dark, and system.
- Some users requested the ability to manage multiple wallets.
- Users pointed out that the main screen doesn't indicate whether a transaction is a debit or credit.
- There are some missing translations e.g. in the alerts displayed to the user.
- The app could use a bit more work on look and feel especially that it lacks icons e.g. in settings menu.

I fixed some of these issues e.g. ability to reset password, delete account, improvement to look and feel etc. However, I didn't have enough time in the end to implement all the suggestions.

Here is a early version of the theme settings screen, which I later improved based on user feedback:

<img src="etc/theme-settings-old.png" width="300">

## Prototyping

I did some early prototyping for the navigation flow on Expo Snack. I tried out React Router 6 native package however it lacks the basic UI components such as `BottomTabsNavigator` that React Navigation package provides. So I decided to use React Navigation.

I decided to use Firebase as backend because it requires minimal amount of time to have a basic API ready. I applied security rules to Firestore to allow authenticated users to read and write only their own data. Once the data access rules worked as expected, I was confident enough to rely on Firebase as the backend.

Soon, I had issues with firebase not working on Snack, so I had to switch to offline development on my MacBook. While I initally used TypeScript locally, I decided to switch to JavaScript because I feared I might not be able to deploy the app as Expo Snack. I also decided against using React Native UI libraries other than `react-native-table-view-simple` due to possible issues with Expo Snack.

## Development

I mostly developed the app on MacOS using VS Code and Expo. Developing on MacOS allowed me to test the app on iPhone emulator. Occasionally, I had to test certain features using an actual device. I also kept trying out the app in a browser to test the web version.

I used Eslint and Prettier in my application which allowed to me to keep the code consistent and clean.

Some of the notable programming and other techniques I used are:

- Organizing my code into a neat folder structure such as `components`, `contexts`, `navigation`, `screens`, `locales` and `utils`. Within `screens` folder, I further organized my code into folders for each tab screen e.g. `wallet`, `user`, and `settings`, and so on.
- Using React Context to share state between components thus avoiding "props drilling". Since the app is small, I didn't want to use Redux. Please see `contexts` folder to find authentication and theme contexts.
- Translations: I used `react-i18next` to translate the app. Please see `locales` folder to find the translations. To detect system language, I relied on a package called `i18next-react-native-language-detector`. Thus the app switches to system language on first launch however if the user changes the language, the app switches to the user's selection.
- I used AsyncStorage to store certain user settings such as theme and language. I clear the AsyncStorage when the user logs out.
- Using `react-native-table-view-simple` to keep the UI clean and "native" looking, especially on iOS.
- Having custom wrappers for form components that hook into Formik API to seamlessly manage form state and display validation errors. For validation, I used `yup` package. Please see `components` folder to find the wrappers `TextInput` and `ButtonSelect`.
- For backend, I used Firebase Auth and Firestore. I used the following security rule on firestore:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    match /users/{user} {
      allow read, write: if request.auth != null && request.auth.uid == user
      match /transactions/{transaction} {
        allow read, write: if request.auth != null && request.auth.uid == user
      }
    }
  }
}
```

While I really wanted to implement more features and improvements based on user feedback, I did not have enough time to do so. Therefore, I decided to spend the remaining time on testing and polishing the existing features based on user feedback.

## Testing

For automated testing, I used Jest and React Native Testing Library. These tests are located in `components/__tests__/` folder. I wrote some decent tests for `TextInput` and `ButtonSelect` components. However the test coverage for the app as a whole is not satisfactory.

Some of the tests are snapshot tests but others test the behavior of the component based on some user actions. For example, in button select component, I test that but the component correctly updates value in Formik on user click on a different option. For this purpose, I used `fireEvent` function from `@testing-library/react-native` package.

I would have liked to have some end to end tests for the app. However, my initial researched revealed it would be a lot of work to set up end to end tests for React Native app. And I was already running out of time.

## Evaluation

I am happy to be able to have a working app that seems to be quite usable. I don't encounter bugs often. During these past few days, I have fixed countless bugs and issues, I added a number of features that users requested:

- Ability to reset password
- Ability to delete account and all associated data
- Improved look and feel of the app
- and more...

Unfortunately, I didn't have enough time to add some features that I hoped for, such as ability to attach and upload images to transactions. I would have loved to work with Camera API and using some computer vision AI. I also was not able to improve the test coverage because some of the components as heavily coupled with the backend which is very difficult to mock.

Also it is a bummer that the app doesn't work in Expo Snack due to firebase 9 issue. Therefore, I have recorded a video of the app in action.

## Conclusion

Despite the above issues, I still believe I have made a decent effort in this project and actually exceeded my personal expectations. This is one of nice GitHub projects that I would be happy to show to potential employers in the interviews. I am happy to have learned a lot about React Native and Firebase and the importance of testing.

<div style="page-break-after: always;"></div>

## Demo and screenshots

Video demo: [https://www.youtube.com/watch?v=p3Rfab8EipA](https://www.youtube.com/watch?v=p3Rfab8EipA)

Screenshots:

<div style="display:flex;">
  <div>
    <img src="etc/final/1.png">
  </div>
  <div>
    <img src="etc/final/2.png">
  </div>
  <div>
    <img src="etc/final/3.png">
  </div>
</div>
<div style="display:flex;">
  <div>
    <img src="etc/final/4.png">
  </div>
  <div>
    <img src="etc/final/5.png">
  </div>
  <div>
    <img src="etc/final/6.png">
  </div>
</div>

## Attributions

- Icons https://iconscout.com