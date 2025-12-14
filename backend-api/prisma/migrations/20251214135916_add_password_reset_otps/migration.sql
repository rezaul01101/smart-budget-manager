-- CreateTable
CREATE TABLE "password_reset_otps" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "otp" VARCHAR(10) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "password_reset_otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "password_reset_otps_user_id_idx" ON "password_reset_otps"("user_id");

-- CreateIndex
CREATE INDEX "password_reset_otps_expires_at_idx" ON "password_reset_otps"("expires_at");

-- AddForeignKey
ALTER TABLE "password_reset_otps" ADD CONSTRAINT "password_reset_otps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
