export type ICurrency = 'THB' | 'USD' | 'INR' | 'CNY';
export type IAgentProfileType = 'Internal' | 'OTA';
export type IEnvironment = 'PROD' | 'UAT';
export type IResetPasswordStatus = 'Success' | 'Failed';
export type IResetPasswordCreatedBy = 'Service' | 'Staff';

export interface IAgentEmail {
  id?: number;
  email: string;
  isPrimary?: boolean;
  firstName?: string;
  lastName?: string;
  contactPhone?: string;
}

export interface IAgentProfileResponse {
  items: IAgentProfileItem[];
  totalRecords: number;
}
export interface IAgentProfileItem {
  id: number;
  companyName: string;
  agencyCode: string;
  currency: ICurrency;
  type: IAgentProfileType;
  contacts?: IAgentEmail[];
  agentPhone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  region?: string;
  assignedBy?: string;
  active?: boolean;
  createdAt?: string;
  modifiedAt?: string;
}

export interface IAgentProfileRequest {
  companyName: string;
  agencyCode: string;
  currency: ICurrency;
  type: IAgentProfileType;
  contacts?: IAgentEmail[];
  agentPhone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  region?: string;
}

export interface IAgentProfileUpdateRequest {
  companyName: string;
  agencyCode: string;
  currency: ICurrency;
  type: IAgentProfileType;
  agentPhone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  region?: string;
  active?: boolean;
}

export interface IContactEmailRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  isPrimary?: boolean;
  active?: boolean;
}

export interface IContactEmailItem {
  id: number;
  profileId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  contactPhone?: string;
  isPrimary: boolean;
  active: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface IContactEmailResponse {
  items: IContactEmailItem[];
  totalRecords: number;
}

export interface CredentialRequest {
  name: string;
  environment: IEnvironment;
  active?: boolean;
}

export interface ICredentialResponse {
  items: ICredentialItem[];
  totalRecords: number;
}

export interface ICredentialItem {
  id: number;
  name: string;
  clientId: string;
  profileId: number;
  clientSecret: string;
  environment: IEnvironment;
  dateGenerated: string;
  active: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface IResAccountRequest {
  isPrimary?: boolean;
  userName: string;
  environment: IEnvironment;
  isWorking?: boolean;
  note?: string;
  active?: boolean;
}

export interface IResAccountResponse {
  items: IResAccountItem[];
  totalRecords: number;
}
export interface IResAccountItem {
  id: number;
  profileId: number;
  isPrimary: boolean;
  userName: string;
  environment: IEnvironment;
  dateGenerated: string;
  latestResetPasswordAI: string;
  isWorking: boolean;
  note: string;
  active: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface IResetPasswordLogResponse {
  id: number;
  accountId: number;
  message: string;
  status: IResetPasswordStatus;
  createdBy: IResetPasswordCreatedBy;
  createdAt: string;
}
