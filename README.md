# API of the Wild - Server

The RESTful Breath of the Wild API.

## Getting Started

Prerequisites

- Node 8, NPM, & Yarn
- Docker (for integration testing)
- Postgres 10.5 (for local development)

### Local Server Setup

```
yarn install

yarn start
```

Without Postgres setup, pinging the server will fail.

### Local Database Setup

- Install postgres
- Run sql setup scripts for each domain, such as `psql -U yourUserName -d botw -a -f ./scripts/db/geography.sql`

### Run Server and Database via Docker

```
yarn docker:up

// server is available on localhost:3001

// when finished...

yarn docker:down
```

## Tests

### Basic Testing

Testing suite includes

- Linting: `yarn test:lint`
- Dependency Checks: `yarn test:depcheck`
- Unit & Coverage: `yarn test:unit`

Run the entire testing suite with `yarn test`.

View testing reports

- Unit: `yarn view:unit`
- Coverage: `yarn view:coverage`

### Integration Testing and Docker

If you have dependencies installed and a local postgres database setup, run `yarn start && yarn test:integration`.

Otherwise, run integration tests via Docker with `yarn docker:test`.

## TODOs

### Infrastructure

- [ ] IAM Roles
- [ ] CloudFront
- [ ] EC2
- [ ] Aurora

### Testing

- [ ] Improve Depcheck test output

### Other

- [ ] Abstract utilities to separate repo
- [ ] Get logs from executable container
- [ ] Update OpenAPI /geography spec with 400 and 404 responses
