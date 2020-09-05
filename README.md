# DEEL BACKEND TASK

Seed data:

- `npm run db:sync` - create all tables and fill them with feed data

Routes for testing:

- `localhost:3001/contracts` - shows all contracts for defined `profile_id` (in headers)
- `localhost:3001/contract/2` - shows contract #2 for `profile_id` (in headers), will works for `profile_id=6`
