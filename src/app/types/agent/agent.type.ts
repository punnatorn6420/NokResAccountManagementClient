export type AgentType = 'PREPAID' | 'POSTPAID' | string;

export interface IAgentProfile {
  id: number;
  companyName: string;
  agencyCode: string;
  baseCurrency: string;
  agentType: AgentType;
  contactEmail: string;
  active?: boolean;
  createdAt?: string;
  modifiedAt?: string;
}
