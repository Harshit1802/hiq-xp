import IFeedback from "../interfaces/demoFeedback.interface";
import Feedback from "../schemas/demoFeedback.schema";

class DemoFeedbackRepository {

    public async getDemoFeedback(): Promise<IFeedback[]> {
        const demoFeedback = await Feedback.find().sort({ "timestamp": -1 })
        return demoFeedback;
    }

    public async createDemoFeedback(demoFeedback: any): Promise<any> {
        const createDemoFeedback = new Feedback({
            createdBy: demoFeedback.createdBy,
            updatedBy: demoFeedback.updatedBy,
            feedback: demoFeedback.feedback,
            demoScheduleId: demoFeedback.demoScheduleId,
            timestamp: new Date(),
        });
        const savedDemoFeedback = await createDemoFeedback.save()
        return savedDemoFeedback;
    }


    public async updateDemoFeedback(demoFeedback: any, feedbackId: any): Promise<any> {

        const updateDemoFeedback = await Feedback.findByIdAndUpdate(
            feedbackId,
            { $set: demoFeedback },
            { "upsert": true }

        ).select({})
        return updateDemoFeedback;
    }

    public async deleteDemoFeedback(feedbackId: any): Promise<IFeedback | null> {
        const deleteDemoFeedback = await Feedback.findByIdAndDelete(feedbackId);
        return deleteDemoFeedback
    }
}

export default DemoFeedbackRepository