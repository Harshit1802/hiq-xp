import DemoFeedbackRepository from "../repositories/demoFeedback.repository";

class DemoFeedbackService {
    private demoFeedbackRepository: DemoFeedbackRepository

    constructor() {
        this.demoFeedbackRepository = new DemoFeedbackRepository()
    }

    public async getDemoFeedback() {
        const getDemoFeedback = await this.demoFeedbackRepository.getDemoFeedback();
        return getDemoFeedback;
    }

    public async createDemoFeedback(demoFeedback: any): Promise<any> {
        const createDemoFeedback = {
            createdBy: demoFeedback.createdBy,
            updatedBy: demoFeedback.updatedBy,
            feedback: demoFeedback.feedback,
            demoScheduleId: demoFeedback.demoScheduleId,
        }
        const savedDemoFeedback = await this.demoFeedbackRepository.createDemoFeedback(createDemoFeedback);
        return savedDemoFeedback
    }

    public async updateDemoFeedback(demoFeedback: any, feedbackId: any): Promise<any> {

        const updateDemoFeedback = await this.demoFeedbackRepository.updateDemoFeedback(demoFeedback, feedbackId)
        return updateDemoFeedback
    }

    public async deleteDemoFeedback(feedbackId: any): Promise<any> {
        const deleteDemoFeedback = await this.demoFeedbackRepository.deleteDemoFeedback(feedbackId)
        return deleteDemoFeedback
    }
}

export default DemoFeedbackService