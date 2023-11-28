import IDemoGraphics from "../interfaces/patientDemoGraphics.interface"
import DemoGraphics from "../schemas/patientDemoGraphics.schema"

class PatientDemoGraphicsRepository {

    public async getDemoGraphics(): Promise<IDemoGraphics[]> {
        const demoGraphics = await DemoGraphics.find().sort({ "timestamp": -1 })
        return demoGraphics
    }

    public async createDemoGraphics(demoGraphics: any): Promise<any> {
        const createDemoGraphics = new DemoGraphics({
            mrnSequenceNo: demoGraphics.mrnSequenceNo,
            createdBy: demoGraphics.createdBy,
            updatedBy: demoGraphics.updatedBy,
            mrn: demoGraphics.mrn,
            firstName: demoGraphics.firstName,
            middleInitial: demoGraphics.middleInitial,
            lastName: demoGraphics.lastName,
            displayName: demoGraphics.displayName,
            sSN: demoGraphics.sSN,
            gender: demoGraphics.gender,
            dob: demoGraphics.dob,
            age: demoGraphics.age,
            addressId: demoGraphics.addressId,
            primaryContactType: demoGraphics.primaryContactType,
            primaryContactNumber: demoGraphics.primaryContactNumber,
            secondaryContactType: demoGraphics.secondaryContactType,
            secondaryContactNumber: demoGraphics.secondaryContactNumber,
            email: demoGraphics.email,
            status: demoGraphics.status,
            patientImageUrl: demoGraphics.patientImageUrl,
            dateofDeath: demoGraphics.dateofDeath,
            placeOfDeath: demoGraphics.placeOfDeath,
            reasonOfDeath: demoGraphics.reasonOfDeath,
            genderOther: demoGraphics.genderOther,
            ptAddressTypeId: demoGraphics.ptAddressTypeId,
            addressTypeOther: demoGraphics.addressTypeOther,
            timestamp: new Date(),
        });
        const savedDemoGraphics = await createDemoGraphics.save()
        return savedDemoGraphics;
    }

    public async updateDemoGraphics(demoGraphics: any, graphicsId: any): Promise<any> {
        const updateDemoGraphics = await DemoGraphics.findByIdAndUpdate(
            graphicsId,
            { $set: demoGraphics },
            { "upsert": true }

        ).select({})
        return updateDemoGraphics;
    }

    public async deleteDemoGraphics(graphicsId: any): Promise<IDemoGraphics | null> {
        const deleteDemoGraphics = await DemoGraphics.findByIdAndDelete(graphicsId).exec();
        return deleteDemoGraphics
    }
}
export default PatientDemoGraphicsRepository