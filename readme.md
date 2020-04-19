## Use the app!

1. Keep track of your shared payments in `period.yml`
  - For now, only the `total` key and `members` key are required for each row.
  - (`members` can be omitted if you set `defaultShared` in `settings.yml`)

2. `npm start` to see your results!

3. Commit the payment by running `npm run confirm`. The rows will be saved to `archived` and a new `period.yml` file will be created.

Features:

- Add `tags` to track what your payments are associated with. Tags can be any string you want.

- Exceptions (`ex`): You can adjust parts of your bill to reflect payments that specific individuals should take care of. 
No need to subtract from total receipt - this will be done automatically. Even these can split further! 
The format looks like this:
`- desc: "tag" / "member", "member", "member"`
Example: `Nachos / Kurt, Nicole`