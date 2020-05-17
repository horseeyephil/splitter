## Use the app!

1. Keep track of your shared payments in `period.yml`
  - Add yml rows to represent purchases -- Looks something like this:
  ```
  # copy this key structure and put it "period.yml" at the directory root
- date: 2020-04-19
  desc: groceries
  total: 110 #REQUIRED
  paidBy: philip # REQUIRED
  ex:
    - desc: empanadas / philip # <tag> / (backslash) [<members>] (comma separated)
      total: 9
    - desc: chili /  kurt
      total: 6
    - desc: raviolis / lora 
      total: 6
  members: philip, lora, kurt
  tags: groceries, household
  loc: Whole Foods 

- date: 2020-04-17
  desc: Dinner for two
  total: 36 #REQUIRED
  paidBy: philip # REQUIRED
  tags: dinner
  members: philip, lora
  loc: Cheesecake Factory
  ```
  - For now, only the `total` key and `members` key are required for each row.
  - (`members` can be omitted if you set `defaultShared` in `settings.yml`) like this: 
  ```
  # settings.yml
  defaultShare:
  - philip
  - lora
  ```
 

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
Example: 
`Latte / Philip`
or 
`Nachos / Kurt, Nicole`
to split the exception between multiple people!

#### Representing Payouts
- Fortunately representing payouts by users to each other is a synch! It is already achievable with the default splitting logic.
- Simply create a new row-entry, and create an `ex` exemption entry for the recipient of the payment. The person who made the payment should be marked as the `paidBy` key-value. The payout settlement will be accounted for in the period summary.
Like this:
```
- date: 2020-04-01
  desc: <PAYMENT> STEVEN TO LEAH # (this can actually be any description you want, but it's nice to specially mark it)
  total: 0 # You can leave this 0 so it doesn't factor into the period totals
  paidBy: steven
  ex: 
    desc: receiving payment / leah
    total: 80 # but the total payout needs to go here
  tags: user payment

```
