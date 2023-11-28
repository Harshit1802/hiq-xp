import PatientPcpDetailsRepository from "../repositories/patientPcpDetails.repository";

class PatientPcpDetailsService {
    private patientPcpDetailsRepository: PatientPcpDetailsRepository

    constructor() {
        this.patientPcpDetailsRepository = new PatientPcpDetailsRepository()
    }

    public async getPcpDetails() {
        const getPcpDetails = await this.patientPcpDetailsRepository.getPcpDetails();
        return getPcpDetails;
    }

    public async createPcpDetails(pcpDetails: any): Promise<any> {
        const createPcpDetails = {
            createdBy: pcpDetails.createdBy,
            updatedBy: pcpDetails.updatedBy,
            patientDemographicId: pcpDetails.patientDemographicId,
            primaryCareProviderId: pcpDetails.primaryCareProviderId,
            pcpName: pcpDetails.pcpName,
            pcpNpi: pcpDetails.pcpNpi,
            associatedPhysicians: pcpDetails.associatedPhysicians,
            physicianLocationId: pcpDetails.physicianLocationId,
            fileName: pcpDetails.fileName,
            uri: pcpDetails.uri,
        }
        const savedPcpDetails = await this.patientPcpDetailsRepository.createPcpDetails(createPcpDetails);
        return savedPcpDetails
    }

    public async updatePcpDetails(pcpDetails: any, pcpDetailsId: any): Promise<any> {
        const updatePcpDetails = await this.patientPcpDetailsRepository.updatePcpDetails(pcpDetails, pcpDetailsId)
        return updatePcpDetails
    }

    public async deletePcpDetails(pcpDetailsId: any): Promise<any> {
        const deletePcpDetails = await this.patientPcpDetailsRepository.deletePcpDetails(pcpDetailsId)
        return deletePcpDetails
    }
}
export default PatientPcpDetailsService