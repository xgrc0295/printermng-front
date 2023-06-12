export class Fault{
    constructor(
        public faultId: string,
        public faultName: string,
        public faultDescrip: string,
        public faultReason: string,
        public faultSolve: string,
        public  empId: string,
        public empName: string,
        public customerName: string,
        public customerAddress: string,
        public orderNumber: string
        )
    {}
    
}