-- Required by P3 Proposals: block duplicate applications per freelancer/job.
CREATE UNIQUE INDEX "proposals_jobId_freelancerId_key" ON "proposals"("jobId", "freelancerId");
