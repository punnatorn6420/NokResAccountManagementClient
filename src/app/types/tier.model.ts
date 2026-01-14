export interface IMemberTier {
  points: IPoints;
  tierPoints: ITierPoints;
}

export interface ITierPoints {
  contactId: string;
  memberId: string;
  membershipNumber: string;
  title: string;
  firstName: string;
  lastName: string;
  firstNameThai: string;
  lastNameThai: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  passportNumber: string;
  nationality: string;
  phone: string;
  address: string;
  district: string;
  subDistrict: string;
  city: string;
  districtThai: string;
  subDistrictThai: string;
  cityThai: string;
  postalCode: string;
  country: string;
  isEncryptedPassword: boolean;
  loyaltyInfo: ILoyaltyInfo;
  isThaiNationality: boolean;
  memberStatus: string;
}

export interface IPoints {
  contactId: string;
  memberId: string;
  membershipNumber: string;
  title: string;
  firstName: string;
  lastName: string;
  firstNameThai: string;
  lastNameThai: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  passportNumber: string;
  nationality: string;
  phone: string;
  address: string;
  district: string;
  subDistrict: string;
  city: string;
  districtThai: string;
  subDistrictThai: string;
  cityThai: string;
  postalCode: string;
  country: string;
  isEncryptedPassword: boolean;
  loyaltyInfo: ILoyaltyInfo;
  isThaiNationality: boolean;
  memberStatus: string;
}

export interface ILoyaltyInfo {
  tierName: string;
  pointBalance: number;
  pointExpiry: string;
  tierExpiry: string;
}
