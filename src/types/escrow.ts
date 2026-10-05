export type EscrowStatus = "PENDING" | "HELD_IN_ESCROW" | "RELEASED" | "REFUNDED";

export interface EscrowTransaction {
  id: string;
  jobId: string;
  jobTitle: string;
  employerId: string;
  employerName: string;
  freelancerId: string;
  freelancerName: string;
  amount: number;
  status: EscrowStatus;
  createdAt: string;
  releasedAt?: string;
}
