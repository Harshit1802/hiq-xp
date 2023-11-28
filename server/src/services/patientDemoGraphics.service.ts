import PatientDemoGraphicsRepository from "../repositories/patientDemoGraphics.repository"

class PatientDemoGraphicsService {
    private patientDemoGraphicsRepository: PatientDemoGraphicsRepository

    constructor() {
        this.patientDemoGraphicsRepository = new PatientDemoGraphicsRepository()
    }

    public async getDemoGraphics() {
        const getDemoGraphics = await this.patientDemoGraphicsRepository.getDemoGraphics();
        return getDemoGraphics;
    }

    public async createDemoGraphics(demoGraphics: any): Promise<any> {
        const createDemoGraphics = {
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
        }
        const savedDemoGraphics = await this.patientDemoGraphicsRepository.createDemoGraphics(createDemoGraphics);
        return savedDemoGraphics
    }

    public async updateDemoGraphics(demoGraphics: any, graphicsId: any): Promise<any> {
        const updateDemoGraphics = await this.patientDemoGraphicsRepository.updateDemoGraphics(demoGraphics, graphicsId)
        return updateDemoGraphics
    }

    public async deleteDemoGraphics(graphicsId: any): Promise<any> {
        const deleteDemoGraphics = await this.patientDemoGraphicsRepository.deleteDemoGraphics(graphicsId)
        return deleteDemoGraphics
    }
}
export default PatientDemoGraphicsService