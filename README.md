deployed version: https://codesandbox.io/s/github/OlegLustenko/apollo-local-state

# Motivation

The questions was can we migrate redux-like/useReducer code-base
to apollo-local-state and figure out the first steps of migration

[Possible deprecations in "store-land" by react-team](https://reactjs.org/docs/concurrent-mode-adoption.html#what-to-expect) :
![Deprecation warning](https://github.com/OlegLustenko/apollo-local-state/blob/master/docs/concurent-react.png?raw=true)

## Links

- [Apollo Local State](https://www.apollographql.com/docs/react/data/local-state/)
- [Redux-like Architecture]()

## Apollo-local state limitations

- virtual fields in schemas can't work in reactive manner
  - [stackoverflow](https://stackoverflow.com/questions/58202011/apollo-client-resolver-only-triggers-once)
  - [git #5550](https://github.com/apollographql/apollo-client/issues/5550)
- workaround around virtual fields degrade performance, moving ViewModel/selectors layer to graphql fields are limited by perf issues
- [Local Resolvers](https://www.apollographql.com/docs/react/data/local-state/#local-resolvers) and Mutations has identical signature but limitations are different
  
  signature:
  ```ts
  fieldName: (obj, args, context, info) => result;
  ```
  We can't use `context.client.readQuery` inside of _Resolvers_ but we can do so at _Mutations_.
    The only way to write shared code there it's `context.client.query`

## Pros

- All pros of graphql + apollo
- There a clear way to migrate redux-like code-base and it's scalable solution
