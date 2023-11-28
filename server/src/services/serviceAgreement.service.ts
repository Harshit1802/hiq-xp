import ServiceAgreementRepository from "../repositories/serviceAgreement.repository"

class ServiceAgreementService {
    private serviceAgreementRepository: ServiceAgreementRepository

    constructor() {
        this.serviceAgreementRepository = new ServiceAgreementRepository()
    }

    public async createServiceAgreement(serviceAgreement: any): Promise<any> {
        const createServiceAgreement = {
            createdBy: serviceAgreement.createdBy,
            updatedBy: serviceAgreement.updatedBy,
            contractPeriodFrom: serviceAgreement.contractPeriodFrom,
            contractPeriodTo: serviceAgreement.contractPeriodTo,
            contractPeriod: serviceAgreement.contractPeriod,
            contractEnvelopeId: serviceAgreement.contractEnvelopeId,
            contractEnvelopeStatus: serviceAgreement.contractEnvelopeStatus,
            contractEnvelopeSentDate: serviceAgreement.contractEnvelopeSentDate,
            contractEnvelopeSignedDate: serviceAgreement.contractEnvelopeSignedDate,
            demoRequestId: serviceAgreement.demoRequestId,
            contractSubscriptionPlanId: serviceAgreement.contractSubscriptionPlanId,
            contractDiscountId: serviceAgreement.contractDiscountId,
            fileName: serviceAgreement.fileName,
            uri: serviceAgreement.uri,
        }
        const savedServiceAgreement = await this.serviceAgreementRepository.createServiceAgreement(createServiceAgreement);
        return savedServiceAgreement
    }

    public async getServiceAgreement() {
        const getServiceAgreement = await this.serviceAgreementRepository.getServiceAgreement();
        return getServiceAgreement;
    }

    public async updateServiceAgreement(serviceAgreement: any, serviceId: any): Promise<any> {
        const updateServiceAgreement = await this.serviceAgreementRepository.updateServiceAgreement(serviceAgreement, serviceId)
        return updateServiceAgreement
    }

    public async deleteServiceAgreement(serviceId: any): Promise<any> {
        const deleteServiceAgreement = await this.serviceAgreementRepository.deleteServiceAgreement(serviceId)
        return deleteServiceAgreement
    }

}

export default ServiceAgreementService