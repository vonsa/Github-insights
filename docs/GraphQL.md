# Apollo & GraphQL

Apollo is implemented in this project to enable it's rich set of features for GraphQL.

### API schema

The Github API schema is located at src/schemas/github-api-schema.graphql

### Apollo functionalities in use

Caching
Afterware tied to the authentication service
Visual Studio Code extension

### Type generation

Running Apollo client codegen will automatically convert GraphQL queries starting with `gql` to typescript type definitions. Running `npm run dev` will automatically watch for changes and generate new types.

### Fragments

Fragments are conditionally loaded into a query using the GraphQL `@include` directive. This allows conditional queries to be combined with strict typing using typescript generics.

### Defining return types

The `fetchUser` function is an example of a typed query execution which has a defined return type. The return type is a combination of auto generated types which are mapped using the function arguments combined with a typescript interface and generics.

### Apollo GraphQL extension

Extension id: apollographql.vscode-apollo

Adds useful features like autocompletion when writing queries.

To enable, create a personal API key at https://studio.apollographql.com/ and add it as the value to the APOLLO_KEY property in the .env file.
