export type Currency = 'THB' | 'USD' | 'INR' | 'CNY';
export type AgentProfileType = 'Internal' | 'OTA';
export type Environment = 'PROD' | 'UAT';
export type ResetPasswordStatus = 'Success' | 'Failed';
export type ResetPasswordCreatedBy = 'Service' | 'Staff';

export interface ApiSuccess<T> {
  status: string;
  data: T;
}

export interface InvalidRequestResponse {
  message: string;
}

export interface UnauthorizedResponse {
  message: string;
}

export interface InvalidTokenResponse {
  message: string;
}

export interface InternalServerErrorResponse {
  error: {
    code: string;
    userMessage: string;
    developerMessage: string;
  };
}

export interface AgentEmail {
  id: number;
  email: string;
  isprimary: boolean;
}

export interface AgentProfileResponse {
  id: number;
  companyName: string;
  agencyCode: string;
  currency: Currency;
  type: AgentProfileType;
  firstName?: string;
  lastName?: string;
  emails?: AgentEmail[];
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  region?: string;
  assignedBy?: string;
  createdAt?: string;
  modifiedAt?: string;
}

export interface AgentProfileRequest {
  companyName: string;
  agencyCode: string;
  currency: Currency;
  type: AgentProfileType;
  firstName?: string;
  lastName?: string;
  emails?: Array<{
    email: string;
    isprimary: boolean;
  }>;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  region?: string;
}

export interface AgentProfileUpdateRequest {
  companyName: string;
  agencyCode: string;
  currency: Currency;
  type: AgentProfileType;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  region?: string;
  active?: boolean;
}

export interface ContactEmailRequest {
  email: string;
  isPrimary?: boolean;
  active?: boolean;
}

export interface ContactEmailResponseItem {
  id: number;
  profileId: number;
  email: string;
  isPrimary: boolean;
  active: boolean;
  createdAt: string;
  modifiedAt: string;
}

export type ContactEmailResponse = ContactEmailResponseItem[];

export interface CredentialRequest {
  name: string;
  environment: Environment;
  active?: boolean;
}

export interface CredentialResponse {
  id: number;
  name: string;
  clientId: string;
  profileId: number;
  clientSecret: string;
  environment: Environment;
  dateGenerated: string;
  active: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface ResAccountRequest {
  isPrimary?: boolean;
  userName: string;
  environment: Environment;
  isWorking?: boolean;
  note?: string;
  active?: boolean;
}

export interface ResAccountResponse {
  id: number;
  profileId: number;
  isPrimary: boolean;
  userName: string;
  environment: Environment;
  dateGenerated: string;
  latestResetPasswordAI: string;
  isWorking: boolean;
  note: string;
  active: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface ResetPasswordLogResponse {
  id: number;
  accountId: number;
  message: string;
  status: ResetPasswordStatus;
  createdBy: ResetPasswordCreatedBy;
  createdAt: string;
}
