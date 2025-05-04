const Payment = require("../Model/PaymentModel");

const getAllPayments = async (req, res, next) => {
    let payments;

    try {
        payments = await Payment.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching payments" });
    }

    if (!payments || payments.length === 0) {
        return res.status(404).json({ message: "No payments found" });
    }

    return res.status(200).json({ payments });
};


//data insert
const addPayments = async (req, res, next) => {

    const {Amount,Card_number,Name_on_Card,CVV_CODE,Expiration_date}  = req.body;

    let payments;

    try {
        payments = new Payment({Amount,Card_number,Name_on_Card,CVV_CODE,Expiration_date});
        await payments.save();

    }catch (err){

        console.log(err);
    }

    if (!payments){
        return res.status(404).send({message:"unable to add Payments"});
    }

    return res.status(200).json({payments});
    
    


};

const getById = async (req, res, next) =>{

    const id = req.params.id;

    let payments;

    try{

        payments = await Payment.findById(id);
    }catch (err) {

        console.log(err);
    }

    if (!payments){
        return res.status(404).send({message:"Payment not found"});
    }

    return res.status(200).json({payments});
        
    

}

const updatePayment = async (req, res, next) => {

    const id = req.params.id;
    const {Amount,Card_number,Name_on_Card,CVV_CODE,Expiration_date}  = req.body;
    
    let payments;

    try{
        payments = await Payment.findByIdAndUpdate(id,
             {Amount: Amount, Card_number:Card_number, Name_on_Card:Name_on_Card,CVV_CODE:CVV_CODE,Expiration_date:Expiration_date});

             payments = await payments.save();
    }catch(err){
        console.log(err);
    }

    
    if (!payments){
        return res.status(404).send({message:"Unable to Update Payment Details"});
    }

    return res.status(200).json({payments});

};

const deletePayment = async (req, res, next) => {
    const id = req.params.id;

    let payments;

    try{
        payment = await Payment.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }

    if (!payments){
        return res.status(404).send({message:"Unable to Delete Payment Details"});
    }

    return res.status(200).json({payments});
    

};


exports.getAllPayments = getAllPayments;
exports.addPayments = addPayments;
exports.getById = getById;
exports.updatePayment = updatePayment;
exports.deletePayment = deletePayment;
