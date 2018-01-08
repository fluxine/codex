# codex

## Installation
Go to https://console.firebase.google.com.
Create a project for you codex blog, we'll name it 'MYBLOG' in this doc.
Let's assume the project id is 'MYBLOG-projectID'.

#### Configuration

```
cp config.js.model config.js
```

change configuration keys in config.js then 

```
# install firebase tooling
npm install -g firebase-tools

# Make firebase tools use your google account
firebase login

# Tell firebase which project we will deploy on
firebase use MYBLOG-projectID
```

### Building codex

```
npm install && npm build
```

### Deploying

```
firebase deploy
```

## Developments

```
npm i -g flow-typed
flow-typed install react-router-dom@4.2.2
flow-typed install firebase@4.8.1
npm run start
```
