# A Ship-it Day Archival Email Processing Application

### 🌵 created by Caktus Group 🏜

### 🚀 To Get Started

1. clone me
2. npm i
3. npm run start

### Enable Auto-Linting (VSCode)

1. download and enable the following vscode extensions:
   - dbaeumer.vscode-eslint
   - esbenp.prettier-vscode
2. make sure your vscode workspace contains `"editor.formatOnSave": true`
   - (this should already be set if .vscode is checked in to version control)

### Deployment

For deployment documentation, please see the [ratom_server](https://github.com/StateArchivesOfNorthCarolina/ratom-server#deployment) repo.

### Test

1. make sure cypress is installed (`npm i` should do the trick)
2. if not already present, make sure there is a user `test@user.com` with password `testing`
3. npm run cypress:open

To create new tests, open /cypress/integration and add a yourtests.spec.js file.
