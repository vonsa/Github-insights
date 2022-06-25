# Monitoring

## Sentry

Sentry is used to automatically log any uncaught errors, give insight in the occurence and impact of the error and provide additional context for debugging.
Issues are coupled to the latest release.

Link: https://sentry.io/organizations/vonsa/

### Pipeline

Pushing the main branch to release in Azure DevOps automatically updates Sentry with:
1. A new release based on the current version number
2. Sourcemaps for additional debugging context