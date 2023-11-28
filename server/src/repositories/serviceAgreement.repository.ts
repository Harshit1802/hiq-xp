import IServiceAgreement from "../interfaces/serviceAgreement.interface"
import ServiceAgreement from "../schemas/serviceAgreement.schema"

class ServiceAgreementRepository {

    public async getServiceAgreement(): Promise<IServiceAgreement[]> {
        const serviceAgreement = await ServiceAgreement.find().sort({ "timestamp": -1 })
        return serviceAgreement
    }

    public async createServiceAgreement(serviceAgreement: any): Promise<any> {
        const createServiceAgreement = new ServiceAgreement({
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
            timestamp: new Date(),
        });
        const savedServiceAgreement = await createServiceAgreement.save()
        return savedServiceAgreement;
    }

    public async updateServiceAgreement(serviceAgreement: any, serviceId: any): Promise<any> {
        const updateServiceAgreement = await ServiceAgreement.findByIdAndUpdate(
            serviceId,
            { $set: serviceAgreement },
            { "upsert": true }

        ).select({})
        return updateServiceAgreement;
    }

    public async deleteServiceAgreement(serviceId: any): Promise<IServiceAgreement | null> {
        const deleteServiceAgreement = await ServiceAgreement.findByIdAndDelete(serviceId).exec();
        return deleteServiceAgreement
    }
}

export default ServiceAgreementRepository