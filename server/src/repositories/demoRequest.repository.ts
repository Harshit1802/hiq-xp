import IDemoRequest from '../interfaces/demoRequest.interface';
import DemoRequest from '../schemas/demoRequest.schema';

class DemoRequestRepository {

  public async getDemoRequests(): Promise<IDemoRequest[]> {
    const demoRequest = await DemoRequest.find().sort({ "timestamp": -1 })
    return demoRequest
  }

  public async getDemoRequestsById(demoRequestId: string): Promise<IDemoRequest> {
    const demoRequest = await DemoRequest.findById(demoRequestId);
    return demoRequest
  }

  async getDocumentIdByDemoRequestId(demoRequestId: string): Promise<IDemoRequest> {
    const demoRequest = await DemoRequest.findById(demoRequestId);
    return demoRequest;
  }

  public async createDemoRequest(demoRequest: any): Promise<IDemoRequest> {
    const newDemoRequest = new DemoRequest({
      firstName: demoRequest.firstName,
      lastName: demoRequest.lastName,
      jobTitle: demoRequest.jobTitle,
      companyName: demoRequest.companyName,
      address: demoRequest.address,
      streetAddress: demoRequest.streetAddress,
      addressLine2: demoRequest.addressLine2,
      city: demoRequest.city,
      state: demoRequest.state,
      postalCode: demoRequest.postalCode,
      phone: demoRequest.phone,
      email: demoRequest.email,
      website: demoRequest.website,
      timeZone: demoRequest.timeZone,
      timestamp: new Date(),
      demoSchedule: demoRequest.demoSchedule,
      demoRequestNdaDocument: null,
    });
    const savedDemoRequest = await newDemoRequest.save()
    return savedDemoRequest;
  }
  
  public async updateDemoRequest(demoRequest: any, agencyId: any): Promise<any> {
    const updateDemoRequest = await DemoRequest.findByIdAndUpdate(
      agencyId,
      { $set: demoRequest },
      { "upsert": true }

    ).select({})
    return updateDemoRequest;
  }

  public async updateDemoRequestDocument(documentId: string, agencyId: string): Promise<any> {
    const update = {};
    update["demoRequestNdaDocument"] = documentId;

    const updateDemoRequest = await DemoRequest.findByIdAndUpdate(
      agencyId,
      { $set: update },
      { "upsert": true }

    ).select({})
    return updateDemoRequest;
  }

  public async deleteDemoRequest(agencyId: any): Promise<IDemoRequest | null> {
    const deleteDemoRequest = await DemoRequest.findByIdAndDelete(agencyId).exec();
    return deleteDemoRequest
  }
}

export default DemoRequestRepository