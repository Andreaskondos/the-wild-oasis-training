# Step 1

```
#
gunzip <filename>.backup.gz

#
file --mime-type <filename>.backup

#
head -n 20 <filename>.backup
```

# Step 2

```
psql 'postgresql://myuser:mypassword@db.myproject.supabase.co:5432/mydatabase' < database-dump.sql

example

'postgresql://postgres.cksgzlvsxdhqlusibfrs:secretpassword@aws-0-eu-central-1.pooler.supabase.com:6543/postgres'
```
