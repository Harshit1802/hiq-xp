import SubscriptionPlanRepository from "../repositories/subsciptionPlan.repository";

class SubscriptionPlanService {
    private subscriptionPlanRepository: SubscriptionPlanRepository

    constructor() {
        this.subscriptionPlanRepository = new SubscriptionPlanRepository()
    }

    public async getSubscriptionPlan() {
        const getSubscriptionPlan = await this.subscriptionPlanRepository.getSubscriptionPlan();
        return getSubscriptionPlan;
    }

    public async createSubscriptionPlan(subsciptionPlan: any): Promise<any> {
        const createSubscriptionPlan = {
            createdBy: subsciptionPlan.createdBy,
            updatedBy: subsciptionPlan.updatedBy,
            planName: subsciptionPlan.planName,
            activePatientRangeFrom: subsciptionPlan.activePatientRangeFrom,
            activePatientRangeTo: subsciptionPlan.activePatientRangeTo,
            branchRangeFrom: subsciptionPlan.branchRangeFrom,
            branchRangeTo: subsciptionPlan.branchRangeTo,
            monthlyCost: subsciptionPlan.monthlyCost,
            description: subsciptionPlan.description,
            effectiveDate: subsciptionPlan.effectiveDate,
            expirationDate: subsciptionPlan.expirationDate,
        }
        const savedSubscriptionPlan = await this.subscriptionPlanRepository.createSubscriptionPlan(createSubscriptionPlan);
        return savedSubscriptionPlan
    }

    public async updateSubscriptionPlan(subsciptionPlan: any, subscriptionId: any): Promise<any> {

        const updateSubscriptionPlan = await this.subscriptionPlanRepository.updateSubscriptionPlan(subsciptionPlan, subscriptionId)
        return updateSubscriptionPlan
    }

    public async deleteSubscriptionPlan(subscriptionId: any): Promise<any> {
        const deleteSubscriptionPlan = await this.subscriptionPlanRepository.deleteSubscriptionPlan(subscriptionId)
        return deleteSubscriptionPlan
    }
}

export default SubscriptionPlanService
