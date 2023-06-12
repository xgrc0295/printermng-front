export class Customer {
    constructor(
      public customerId: string,
      public customerName:string,
      public address: string,
      public region: string,
      public gender: string,
      public phoneNumber: string,
      public customerEmail: string,
      public hobby: string,
      public purchaseIntention: string,
      public bankAccount: string,
      public duty: string,
      public companyName: string,
      public companyEmail: string,
      public createTime: string,
      public deleteTime: string,
      public deleteFlag:boolean
    ) {}
  }