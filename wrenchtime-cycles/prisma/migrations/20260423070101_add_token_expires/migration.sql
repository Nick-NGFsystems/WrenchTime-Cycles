-- AlterTable: add tokenExpires to ServiceRequest
-- This column is set by the NGF admin when approving a service request.
ALTER TABLE "ServiceRequest" ADD COLUMN "tokenExpires" TIMESTAMP(3);
