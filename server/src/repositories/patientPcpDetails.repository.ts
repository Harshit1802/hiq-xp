import IPatientPcpDetails from "../interfaces/patientPcpDetails.interface"
import PcpDetails from "../schemas/patientPcpDetails.schema"

class PatientPcpDetailsRepository {

    public async getPcpDetails(): Promise<IPatientPcpDetails[]> {
        const pcpDetails = await PcpDetails.find().sort({ "timestamp": -1 })
        return pcpDetails
    }

    public async createPcpDetails(pcpDetails: any): Promise<any> {
        const createPcpDetails = new PcpDetails({
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
            timestamp: new Date(),
        });
        const savedPcpDetails = await createPcpDetails.save()
        return savedPcpDetails;
    }

    public async updatePcpDetails(pcpDetails: any, pcpDetailsId: any): Promise<any> {
        const updatePcpDetails = await PcpDetails.findByIdAndUpdate(
            pcpDetailsId,
            { $set: pcpDetails },
            { "upsert": true }

        ).select({})
        return updatePcpDetails;
    }

    public async deletePcpDetails(pcpDetailsId: any): Promise<IPatientPcpDetails | null> {
        const deletePcpDetails = await PcpDetails.findByIdAndDelete(pcpDetailsId).exec();
        return deletePcpDetails
    }
}
export default PatientPcpDetailsRepository