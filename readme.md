## Use the app!

1. Keep track of your shared payments in `period.yml`
  - For now, only the `total`, `paidBy`, and `members` keys are required for each row.
  - (`members` can be omitted if you set `defaultShared` in `settings.yml`)

2. `npm start` to see your results!

3. Commit the payment by running `npm run confirm`. The rows will be saved to `archived` and a new `period.yml` file will be created.

### Features:

#### Running Tabs
- The app will calculate running tabs owed between users. The `paidBy` key is required on every row. This will determine the status of payments and balances over the period. 
  - Ex: if `paidBy` =  "rob", in a $120 payment split between "rob", "stephen", and "leah": Rob will not owe any balance for that row, and Stephen and Leah will owe Rob $40 each. This will be accounted over the period - the app will tell you the debt balances between individual users.

#### Tags
- Add `tags` to track what your payments are associated with. Tags can be any string you want.

#### Individualized receipts
- Exceptions (`ex`): You can adjust parts of your bill to reflect payments that specific individuals should take care of. 
No need to subtract from total receipt - this will be done automatically. Even these can split further! 
The format looks like this:
`- desc: "tag" / "member", "member", "member"`
Example: `Nachos / Kurt, Nicole`
