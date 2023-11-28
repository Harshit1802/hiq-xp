import IDemoSchedule from '../interfaces/demoSchedule.interface'
import Schedule from '../schemas/demoSchedule.schema'

class DemoScheduleRepository {

    public async getDemoSchedule(): Promise<IDemoSchedule[]> {
       const demoSchedule = await Schedule.find().sort({ "timestamp": -1})
       return demoSchedule;
    }

    public async createDemoSchedule(demoSchedule: any): Promise<any> {
        const newDemoSchedule =  new Schedule({
          createdBy: demoSchedule.createdBy,
          updatedBy: demoSchedule.updatedBy,
          demoGivenByUserId: demoSchedule.demoGivenByUserId,
          demoGivenByAlternativeId: demoSchedule.demoGivenByAlternativeId,
          demoScheduleDate: demoSchedule.demoScheduleDate,
          demoScheduleTimeFrom: demoSchedule.demoScheduleTimeFrom,
          demoScheduleTimeTo: demoSchedule.demoScheduleTimeTo,
          demoDuration: demoSchedule.demoDuration,
          meeting: demoSchedule.meeting,
          description: demoSchedule.description,
          demoRequestId: demoSchedule.demoRequestId,
          timestamp: new Date(),
        });
        const savedDemoSchedule = await newDemoSchedule.save()
        return savedDemoSchedule;
    }

    public async updateDemoSchedule(demoSchedule: any, scheduleId: any): Promise<any> {

        const updateSchedule = await Schedule.findByIdAndUpdate(
            scheduleId,
          {$set: demoSchedule},
          { "upsert" : true } 
         
        ).select({ })
        return updateSchedule;
      }

      public async deleteDemoSchedule(scheduleId: any): Promise<IDemoSchedule | null> {
        const deleteDemoSchedule = await Schedule.findByIdAndDelete(scheduleId);
        return deleteDemoSchedule
      }
}

export default DemoScheduleRepository;