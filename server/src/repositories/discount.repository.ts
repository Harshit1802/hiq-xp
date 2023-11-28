import IDiscount from "../interfaces/discount.interface";
import Discount from "../schemas/discount.schema";

class DiscountRepository {

  public async getDiscount(): Promise<IDiscount[]> {
    const discount = await Discount.find().sort({ "timestamp": -1 })
    return discount;
  }


  public async createDiscount(discount: any): Promise<any> {
    const createDiscount = new Discount({
      createdBy: discount.createdBy,
      updatedBy: discount.updatedBy,
      discountName: discount.discountName,
      percentage: discount.percentage,
      validityPeriod: discount.validityPeriod,
      description: discount.description,
      value: discount.value,
      timestamp: new Date(),
    });
    const savedDiscount = await createDiscount.save()
    return savedDiscount;
  }

  public async updateDiscount(discount: any, discountId: any): Promise<any> {

    const updateDiscount = await Discount.findByIdAndUpdate(
      discountId,
      { $set: discount },
      { "upsert": true }

    ).select({})
    return updateDiscount;
  }

  public async deleteDiscount(discountId: any): Promise<IDiscount | null> {
    const deleteDiscount = await Discount.findByIdAndDelete(discountId);
    return deleteDiscount
  }
}

export default DiscountRepository