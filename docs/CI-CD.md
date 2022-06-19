# CI/CD

The project is hosted on Azure DevOps which takes care of:

1. Automatic tests and collaboration through code reviewing to enforce the quality of the main and release branch.
2. Automatic deployment of the latest release branch build to production.

### Link to environment

Azure DevOps: https://dev.azure.com/vonsa/Github%20insights/

### Add a new change:

Make sure you've pulled the repository from Azure DevOps and base your branches on it.

1. Create a separate branch, commit and push your changes to Azure DevOps.
2. Create a pull request from the pushed branch. The pull request will perform some tests and try to build the project.
3. If the previous step succeeds, merge the branch to main.

The new main branch will also automatically push to GitHub.

### Deploy a release:

1. Merge main to release using a pull request.

A new build will be created on release which will automatically trigger it's deployment to the production environment.
