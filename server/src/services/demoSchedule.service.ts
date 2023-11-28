import DemoScheduleRepository from "../repositories/demoSchedule.repository";

class DemoScheduleService {
    private demoScheduleRepository: DemoScheduleRepository
    
    constructor() {
        this.demoScheduleRepository = new DemoScheduleRepository()
      }

      public async getDemoSchedule(){
        const getDemoSchedule = await this.demoScheduleRepository.getDemoSchedule();
        return getDemoSchedule;
      }

      public async createDemoSchedule(schedule: any): Promise<any> {
        const demoSchedule = {
          createdBy: schedule.createdBy,
          updatedBy: schedule.updatedBy,
          demoGivenByUserId: schedule.demoGivenByUserId,
          demoGivenByAlternativeId: schedule.demoGivenByAlternativeId,
          demoScheduleDate: schedule.demoScheduleDate,
          demoScheduleTimeFrom: schedule.demoScheduleTimeFrom,
          demoScheduleTimeTo: schedule.demoScheduleTimeTo,
          demoDuration: schedule.demoDuration,
          meeting: schedule.meeting,
          description: schedule.description,
          demoRequestId: schedule.demoRequestId,
        }
        const savedDemoSchedule = await this.demoScheduleRepository.createDemoSchedule(demoSchedule);
        return savedDemoSchedule
      }

      public async updateDemoSchedule(demoSchedule: any, scheduleId: any): Promise<any> {

        const updateSchedule = await this.demoScheduleRepository.updateDemoSchedule(demoSchedule, scheduleId)
        return updateSchedule
      }

      public async deleteDemoSchedule(scheduleId: any): Promise<any> {
        const deleteDemoSchedule = await this.demoScheduleRepository.deleteDemoSchedule(scheduleId)
        return deleteDemoSchedule
      }
}

export default DemoScheduleService