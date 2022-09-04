# PettyCash Developer Guide

## Install dependencies

Please follow the following steps in the given order:

Install expo globally:

```bash
$ npm install -g expo-cli
```

If you don't have yarn installed, you can install it with npm:

```bash
$ npm install -g yarn
```

Install dependencies:

```bash
$ yarn install
```


## Run the app

```bash
$ expo start
```

## Run the tests

```bash
$ yarn test
```

Update the snapshots

```bash
$ yarn test -u
```

## Code style and linting

The app uses [prettier](https://prettier.io/) to format the code and [eslint](https://eslint.org/) to lint the code.

To format the code, install the [prettier plugin](https://prettier.io/docs/en/editors.html) for your editor.

To lint the code, install the [eslint plugin](https://eslint.org/docs/user-guide/integrations) for your editor.

You may also run the following command:

To lint the code:

```bash
$ yarn eslint
```

To auto fix some of the linting errors:

```bash
$ yarn eslint-fix
```

## Firebase

Currently the app uses Firebase key from my own account. You may either use the same key. In this case you don't have to do anything.

If you want to use your own Firebase key, please create an app in Firebase and add the key to the `firebase.js` file.

Please use the following security rules in the Firestore database:

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