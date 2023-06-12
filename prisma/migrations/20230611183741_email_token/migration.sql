/*
  Warnings:

  - A unique constraint covering the columns `[emailToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_emailToken_key" ON "users"("emailToken");
