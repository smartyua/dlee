# TEST

## Commands:
- `npm i` - install all dependencies
- `npm run lint` - Lint checking
- `npm run dev` - start server in devmode with hotreload
- `npm start` - start server in production mode
- `npm run db:migrate` - apply all migrations (or create from scratch DB)

Seed data:

- `npm run db:sync` - fill them with feed data

Routes for testing:

- `localhost:3001/contracts` - shows all contracts for defined `profile_id` (in headers)
- `localhost:3001/contract/2` - shows contract #2 for `profile_id` (in headers), will works for `profile_id=6`
