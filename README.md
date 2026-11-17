# beerCatalog (2023) — React + Node.js beer catalog

This repository is available and contains a React client (`ClientSide/beer-catalog`) and an Express/Sequelize/MySQL backend (`ServerSide`). The earlier portfolio audit was unable to access it, but current GitHub access confirms the code is present.

## Local development

1. Install an appropriate Node.js LTS release and start a disposable local MySQL instance.
2. Create a database/user with scoped privileges for this application.
3. Copy `ServerSide/dbConfig/.env.example` to `ServerSide/dbConfig/.env` and replace placeholders. Because the database settings module calls `dotenv.config()` from the process working directory, either launch the server with the needed environment variables exported or place a private `.env` in `ServerSide/` before starting it.
4. Run `cd ServerSide && npm install && npm start`; the API defaults to port 8080.
5. Run `cd ClientSide/beer-catalog && npm install && npm start` for the React development frontend.

## Portfolio and security status

This is a supporting JavaScript full-stack learning project, not a Java-backend flagship. Existing API writes are not authenticated and Sequelize schema synchronization happens at startup. The test script in the server currently has no implemented test suite. Do not deploy it publicly without input validation, authentication, authorization, rate limits, schema migrations and tests. No end-to-end local run was performed as part of this documentation update.

The tracked database configuration file previously held a hardcoded password. The tracked copy is neutralized on this branch, but credentials remain in Git history; rotate any real/reused password. Adding `.gitignore` does not remove tracked history.
