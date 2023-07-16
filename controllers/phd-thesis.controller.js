const phdModel = require("../models/phd.model")

const phdThesis = function () {

}


phdThesis.addThesis = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        console.log(req.file)
        const { title, author, department,year,course } = req.body;
        const pdfPath = req.file.path;
        const origianl_name = req.file.originalname;
        console.log(pdfPath)

        const newProduct = await phdModel.create({
            title,
            author,
            department,
            year,
            course,
            pdf_origianl_name : origianl_name,
            pdf : pdfPath,
        });

        if(newProduct){
            res.status(200).json({ status : true,message: 'Product added successfully' });
        }else{
            res.status(200).json({ status : false,message: 'Something went wrong' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

phdThesis.getThesis = async (req, res, next) => {
    console.log("getUserList")
    try {
        var thesis = await phdModel.find()
        console.log(thesis)
        thesis.map((el)=>{
            console.log(el.url)
            el.pdf = el.url; 
        })
        console.log(thesis)
        
    } catch (error) {
        return res.status(500).send(error)
    }
    return res.status(200).send({status:true,message:'data list',data:thesis})
}

phdThesis.getThesisById = async (req, res, next) => {
    const {_id} = req.query;
    console.log(_id)
    try {
        var thesis = await phdModel.findById({_id})
        thesis.pdf = thesis.url; 
        if(thesis){
            var apiRes = {status:true,message:'thesis data',data:thesis}
        }else{
            var apiRes = {status:false,message:'something went wrong',data:thesis}
        }
        
        
    } catch (error) {
        return res.status(500).send(error)
    }
    return res.status(200).send(apiRes)
}

phdThesis.deleteThesis = async (req, res, next) => {
    const { _id } = req.query;
    try {
        var thesis = await phdModel.findByIdAndDelete(_id)
        if(thesis){
            var apiRes = {status:true,message:'User deleted successfully'}
        }else{
            var apiRes = {status:false, message:'User not found'}
        }
    } catch (error) {
        return res.status(500).send({status:false,message:'Something went wrong.'})
    }
    return res.status(200).send(apiRes)
}


module.exports = phdThesis;