# The Plan

The plan is to create a GraphQL API that fulfills all requirements set out in the spec. We'll be using Postgres, TypeORM, Express, Jest.

# Setup

1. Clone the repo
2. Run `yarn`
3. Create a postgres db called 'phonebook'. You can change the URL in the .env file.
4. Run `yarn watch` in one command window, and `yarn start` in the other. This gives you a live dev server.
5. Either use the graphql playground or your favourite API toolkit to test.

`yarn test` runs tests
`yarn wtest` runs tests in watch mode

# Reasoning

- GraphQL - A phonebook is pretty textbook GQL territory. It provides a nice way to get the data that we need and nothing we don't.
- Typeorm - I'm very familiar with it, I chose it to lower dev time. I've been enjoying Prisma recently.
- Jest - My favourite testing lib.
- Data Structure - I wanted to support multiple phone numbers, and querying by country code, nunber type, and matching on parts of a phone number. I wanted this same support for addresses.
- Naming Conventions - I try to stick to naming models and 'descriptive objects' in PascalCase, and 'action objects' (or files that do stuff) as camelCase. Aside from that, I try and keep descriptive and never use acronyms.
- Foundation Entity - I use this in almost all projects to ensure that each record has an id, createdAt, and updatedAt field.

# Trade Offs

1. I didn't make any technical tradeoffs so that I could tick the 'production ready' box, though in retrospect I'm frustrated about not getting auth done. Perhaps I should have made the DB structure a little more simple.
2. I didn't have time to use my usual GraphQL resolver testing setup, this takes ~30 mins to get set up so wasn't viable for this project.

# What I'd do differently if I had more time

- Migrations: For time's sake, I used typeorm in sync mode.
- Api Documentation: More thorough api documentation. Currently just basic documentation.
- I didn't have time to do many meaningful tests with a test DB and clean environment. I've got custom helpers to do this nicely with typeorm and apollo.
- I didn't have time to implement auth. Though there's middleware there, it just returns TRUE. I've done this before with Apollo's built in AuthChecker and JWTs or API keys.
- For many contacts, I might've used loaders with more time
- In my personal projects, where I have more time, I use js docs.
- Sorting is pretty easy to implement, annoyed I didn't get that in. In the past I've passed an object of column,sortDir where sortDir is one of ASC or DESC.
- I made things more difficult by not using a boilerplate, but also avoided bloat and came out with a pretty streamlined project. A boilerplate would've been a good idea in this instance and for this task, however. I believe that if I'd have used one, I would have been able to complete the task on time.

# What went well

- Pagination and searching works nicely. It's cursor based and supports limits.
- I'm generally happy with project structure, could definitely be refined but for a quick attempt it's not bad.
- I'm happy with naming conventions, I'm very big on naming things in an obvious way.
- This sort of data is perfectly suited to GraphQL, so i'm happy I used that.

# Time Logging

- 20:33 - Started project setup, readme, configs, environment, TS.
- 20:50 - Deliveroo arrived, break to eat. [used 17 minutes]
- 21:35 - Back from dinner, resuming setting up w/ tests.
- 21:38 - Initial commit [used 20 minutes]
- 22:15 - Fully set up, basic entities, confirmed resolvers working. [used 57 minutes]
- 22:28 - Adding support for pagination and multiple people. [used 1hr 10 minutes]
- 22:32 - Quick break.
- 22:47 - Resume
- 00:03 - tea break [used 2hr 26 minutes]
- 00:30 - returned, need to write readme with remaining time
- 00:56 - Completed readme write up, no remaining time.
