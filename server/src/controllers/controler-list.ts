import IController from "../interfaces/controller.interface";
import DemoRequestController from "./demoRequest.controller";
import AuthController from "./auth.controller";
import DemoScheduleController from "./demoSchedule.controller";
import UserController from "./user.controller";
import CompleteRegistrationController from "./completeRegistration.controller";
import ServiceAgreementController from "./serviceAgreement.controller";
import DocumentController from "./document.controller";
import DiscountController from "./discount.controller";
import SubscriptionPlanController from "./subsciptionPlan.controller";
import DemoFeedbackController from "./demoFeedback.controller";
import RolesController from "./roles.controller";
import PermissionsController from "./permissions.controller";
import PatientDemoGraphicsController from "./patientDemoGraphics.controller";
import PatientReferralDetailsController from "./patientReferralDetails.controller";
import PatientPcpDetailsController from "./patientPcpDetails.controller";
import PatientProviderDetailsController from "./patientCareProviderDetails.controller";
import PatientContactDetailsController from "./patientRepContactDetails.controller";
import PatientEmergencyContactDetailsController from "./patientEmergencyContactDetails.controller";
import PatientOtherDetailsController from "./patientOtherDetails.controller";

class Controllers {
    public static list: IController[] = [
        new UserController(),
        new AuthController(),
        new DemoRequestController(),
        new DemoScheduleController(),
        new CompleteRegistrationController,
        new ServiceAgreementController(),
        new DocumentController(),
        new DiscountController(),
        new SubscriptionPlanController(),
        new DemoFeedbackController(),
        new RolesController(),
        new PermissionsController(),
        new PatientDemoGraphicsController(),
        new PatientReferralDetailsController(),
        new PatientPcpDetailsController(),
        new PatientProviderDetailsController(),
        new PatientContactDetailsController(),
        new PatientEmergencyContactDetailsController(),
        new PatientOtherDetailsController(),
    ]

}

export default Controllers