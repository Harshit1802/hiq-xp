import DemoRequestRepository from '../repositories/demoRequest.repository'

class DemoRequestService {
  private demoRequestRepository: DemoRequestRepository

  constructor() {
    this.demoRequestRepository = new DemoRequestRepository()
  }

  public async createDemoRequest(demoRequest: any): Promise<any> {
    const newDemoRequest = {
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
      demoSchedule: demoRequest.demoSchedule,
    }
    const savedDemoRequest = await this.demoRequestRepository.createDemoRequest(newDemoRequest);
    return savedDemoRequest
  }

  public async getDemoRequests() {
    const getRequest = await this.demoRequestRepository.getDemoRequests();
    return getRequest;
  }

  async getDemoRequestsById(demoRequestId: string): Promise<any> {
    return this.demoRequestRepository.getDemoRequestsById(demoRequestId);
  }

  async getDocumentIdByDemoRequestId(demoRequestId: string): Promise<any> {
    const getDocumentIdByDemoRequestId = await this.demoRequestRepository.getDocumentIdByDemoRequestId(demoRequestId);
    return getDocumentIdByDemoRequestId;
  }

  public async updateDemoRequest(documentId: string, agencyId: string): Promise<any> {
    const updateRequest = await this.demoRequestRepository.updateDemoRequest(documentId, agencyId)
    return updateRequest
  }

  public async updateDemoRequestDocument(docs: any, agencyId: any): Promise<any> {
    const updateRequest = await this.demoRequestRepository.updateDemoRequestDocument(docs, agencyId)
    return updateRequest
  }

  public async deleteDemoRequest(demoRequestId: any): Promise<any> {
    const demoRequest = await this.demoRequestRepository.deleteDemoRequest(demoRequestId)
    return demoRequest
  }
}

export default DemoRequestService
