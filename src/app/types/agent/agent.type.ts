export type ICurrency = 'THB' | 'USD' | 'INR' | 'CNY';
export type IAgentProfileType = 'Internal' | 'OTA';
export type IEnvironment = 'PROD' | 'UAT';
export type IResetPasswordStatus = 'Success' | 'Failed';
export type IResetPasswordCreatedBy = 'Service' | 'Staff';

export interface IAgentEmail {
  id?: number;
  email: string;
  isPrimary?: boolean;
  isprimary?: boolean;
}

export interface IAgentProfileResponse {
  id: number;
  companyName: string;
  agencyCode: string;
  currency: ICurrency;
  type: IAgentProfileType;
  firstName?: string;
  lastName?: string;
  emails?: IAgentEmail[];
  phone?: string;
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
  firstName?: string;
  lastName?: string;
  emails?: IAgentEmail[];
  phone?: string;
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

export interface IContactEmailRequest {
  email: string;
  isPrimary?: boolean;
  active?: boolean;
}

export interface IContactEmailResponseItem {
  id: number;
  profileId: number;
  email: string;
  isPrimary: boolean;
  active: boolean;
  createdAt: string;
  modifiedAt: string;
}

export type IContactEmailResponse = IContactEmailResponseItem[];

export interface CredentialRequest {
  name: string;
  environment: IEnvironment;
  active?: boolean;
}

export interface ICredentialResponse {
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
