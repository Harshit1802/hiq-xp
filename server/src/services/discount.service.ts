import DiscountRepository from "../repositories/discount.repository";

class DiscountService {
  private discountRepository: DiscountRepository

  constructor() {
    this.discountRepository = new DiscountRepository()
  }

  public async getDiscount() {
    const getDiscount = await this.discountRepository.getDiscount();
    return getDiscount;
  }

  public async createDiscount(discount: any): Promise<any> {
    const createDiscount = {
      createdBy: discount.createdBy,
      updatedBy: discount.updatedBy,
      discountName: discount.discountName,
      percentage: discount.percentage,
      validityPeriod: discount.validityPeriod,
      description: discount.description,
      value: discount.value,
    }
    const savedDiscount = await this.discountRepository.createDiscount(createDiscount);
    return savedDiscount
  }

  public async updateDiscount(discount: any, discountId: any): Promise<any> {

    const updateDiscount = await this.discountRepository.updateDiscount(discount, discountId)
    return updateDiscount
  }

  public async deleteDiscount(discountId: any): Promise<any> {
    const deleteDiscount = await this.discountRepository.deleteDiscount(discountId)
    return deleteDiscount
  }
}

export default DiscountService