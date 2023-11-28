class Constant {
  public static readonly YYYY_MM_DD_HH_MM_SS_MS: string =
    'YYYY-MM-DD HH:mm:ss:ms'

  public static readonly LOGS_ALL: string = 'logs/all.log';

  public static readonly LOGS_ERROR: string = 'logs/error.log';

  public static readonly USER_MODEL: string = 'User'
  public static readonly DEMOREQUEST_MODEL: string = 'demo-request'
  public static readonly DEMOSCHEDULE_MODEL: string = 'demo-schedule'
  public static readonly COMPLETE_REGISTRATION_MODEL: string = 'complete-registration'
  public static readonly SERVICE_AGREEMENT_MODEL: string = 'service-agreement'
  public static readonly DOCUMENT_MODEL: string = 'hiq-document'
  public static readonly DISCOUNT_MODEL: string = 'discount'
  public static readonly SUBSCRIPTIONPLAN_MODEL: string = 'subscription-plan'
  public static readonly DEMOFEEDBACK_MODEL: string = 'demo-feedback'
  public static readonly ROLES_MODEL: string = 'roles'
  public static readonly PERMISSIONS_MODEL: string = 'permissions'
  public static readonly PATIENTDEMOGRAPHICS_MODEL: string = 'patient-DemoGraphics'
  public static readonly PATIENTREFERRALDETAILS_MODEL: string = 'patient-ReferralDetails'
  public static readonly PATIENTPCPDETAILS_MODEL: string = 'patient-PcpDetails'
  public static readonly PATIENTCAREPROVIDERDETAILS_MODEL: string = 'patient-CareProviderDetails'
  public static readonly PATIENTREPCONTACTDETAILS_MODEL: string = 'patient-RepContactDetails'
  public static readonly PATIENTEMERGENCYCONTACTDETAILS_MODEL: string = 'patient-EmergencyContactDetails'
  public static readonly PATIENTOTHERDETAILS_MODEL: string = 'patient-OtherDetails'
  
  public static readonly USERNAME_MIN_LENGTH: number = 3
  public static readonly USERNAME_MAX_LENGTH: number = 20
  public static readonly NAME_MIN_LENGTH: number = 3
  public static readonly NAME_MAX_LENGTH: number = 80
  public static readonly EMAIL_MAX_LENGTH: number = 50
  public static readonly PASSWORD_MIN_LENGTH: number = 8
  public static readonly PHONE_MIN_LENGTH: number = 10
  public static readonly PHONE_MAX_LENGTH: number = 20
  public static readonly ADDRESS_MIN_LENGTH: number = 10
  public static readonly ADDRESS_MAX_LENGTH: number = 200
};
export default Constant


