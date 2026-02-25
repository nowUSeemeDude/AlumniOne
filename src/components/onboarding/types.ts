export type PortalType = 'educational' | 'department' | 'corporate' | 'club';

export interface OnboardingData {
  portalType: PortalType | null;
  orgDetails: {
    name: string;
    website?: string;
    country: string;
    logo?: File | null;
    parentInstitution?: string;
    departmentName?: string;
    graduationYear?: string;
    industry?: string;
    description?: string;
    memberCount?: string;
  };
  adminDetails: {
    fullName: string;
    email: string;
    password: string;
  };
}
