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

Testing suite includes

- Linting: `yarn test:lint`
- Dependency Checks: `yarn test:depcheck`
- Unit & Coverage: `yarn test:unit`

Run the entire testing suite with `yarn test`.

View testing reports

- Unit: `yarn view:unit`
- Coverage: `yarn view:coverage`

## TODOs

### Test Suites

- [x] Lint Test
- [x] Unit Test
- [x] Integration Test
- [x] Dependency Check
- [ ] Changelog Check

### Pipeline

- [x] Can use Node and Yarn in pipeline
- [x] PR trigger
- [ ] Merge trigger
- [x] Lint Test stage
- [x] Unit Test stage
- [ ] Integration Test stage
- [ ] Migrate to docker-based stages

### Infrastructure

- [ ] IAM Roles
- [ ] CloudFront
- [ ] SAM Template
- [ ] Aurora / DynamoDB

### Code

- [x] Lambda Factory
- [ ] Tracer
- [x] Logger

trivial change
