# Migration `20200910125557-username-and-email-unique`

This migration has been generated by Ejaz Ahmed at 9/10/2020, 5:55:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username")

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200903063948-initial..20200910125557-username-and-email-unique
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -16,10 +16,10 @@
   // email: string;
   // password?: string;
   // diaryIds: string[] | null;
   id       Int     @id @default(autoincrement())
-  username String
-  email    String
+  username String  @unique
+  email    String  @unique
   password String
   diary    Diary[]
 }
```


