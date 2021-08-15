# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## DB Setup

Get Postgresql here: [Postgresql official's site](https://www.postgresql.org/download/)

- Create username for database`<username>`

```
CREATE USER <username> WITH PASSWORD '<password>';

```

- Create database for development `<name_dev_db>`

```
CREATE DATABASE <name_dev_db>;
```

- Create database for testing `<name_test_db>`

```
CREATE DATABASE <name_test_db>;
```

- Run migration to update database (database for developmeny)

```
db-mirate up
```

## Environment SETUP

create file called `.env` at root of project and put environment setup as below.

```
POSTGRES_HOST=<Your database's location (You can use localhost)>
POSTGRES_DB=<name_dev_db>
POSTGRES_TEST_DB=<name_test_db>
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
ENV=dev
saltRounds=<any number>
bcrypt_code=<any string>
TOKEN_SECRET = <any string>
```

## Run the project

- Install dependencies

```
yarn install
```

- Command to run server

```
yarn start
```

- Command to test at test database

```
yarn test
```

- Command to reset test database

```
yarn resetdb
```

## Schema and Routes

see details at REQUIREMENT.MD
