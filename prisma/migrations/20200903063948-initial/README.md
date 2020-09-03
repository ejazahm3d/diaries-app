# Migration `20200903063948-initial`

This migration has been generated by Ejaz Ahmed at 9/3/2020, 11:39:48 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
)

CREATE TABLE "Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "diaryId" INTEGER,

    FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Diary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userId" INTEGER,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200903063948-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,47 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  // id?: string;
+  // username: string;
+  // email: string;
+  // password?: string;
+  // diaryIds: string[] | null;
+  id       Int     @id @default(autoincrement())
+  username String
+  email    String
+  password String
+  diary    Diary[]
+}
+
+model Entry {
+
+  id        Int       @id @default(autoincrement())
+  title     String
+  content   String
+  createdAt DateTime? @default(now())
+  updatedAt DateTime? @default(now())
+  diary     Diary?    @relation(fields: [diaryId], references: [id])
+  diaryId   Int?
+}
+
+model Diary {
+
+  id        Int       @id @default(autoincrement())
+  title     String
+  type      String
+  createdAt DateTime? @default(now())
+  updatedAt DateTime?
+  user      User?     @relation(fields: [userId], references: [id])
+  userId    Int?
+  entries   Entry[]
+}
```

