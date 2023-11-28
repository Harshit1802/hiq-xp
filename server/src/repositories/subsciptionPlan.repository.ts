import ISubscription from "../interfaces/subsciptionPlan.interface";
import Subscription from "../schemas/subsciptionPlan.schema";

class SubscriptionPlanRepository {

    public async getSubscriptionPlan(): Promise<ISubscription[]> {
        const subsciptionPlan = await Subscription.find().sort({ "timestamp": -1 })
        return subsciptionPlan;
    }

    public async createSubscriptionPlan(subsciptionPlan: any): Promise<any> {
        const createSubscriptionPlan = new Subscription({
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
            timestamp: new Date(),
        });
        const savedSubscriptionPlan = await createSubscriptionPlan.save()
        return savedSubscriptionPlan;
    }

    public async updateSubscriptionPlan(subsciptionPlan: any, subscriptionId: any): Promise<any> {

        const updateSubscriptionPlan = await Subscription.findByIdAndUpdate(
            subscriptionId,
            { $set: subsciptionPlan },
            { "upsert": true }

        ).select({})
        return updateSubscriptionPlan;
    }

    public async deleteSubscriptionPlan(subscriptionId: any): Promise<ISubscription | null> {
        const deleteSubscriptionPlan = await Subscription.findByIdAndDelete(subscriptionId);
        return deleteSubscriptionPlan
    }
}

export default SubscriptionPlanRepository