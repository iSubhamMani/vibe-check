-- CreateTable
CREATE TABLE "Room" (
    "roomCode" TEXT NOT NULL,
    "owner" INTEGER NOT NULL,
    "musicStack" TEXT[],
    "currentMusic" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomCode_key" ON "Room"("roomCode");

-- CreateIndex
CREATE UNIQUE INDEX "Room_owner_key" ON "Room"("owner");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
