const thesisModel = require("../models/thesis.model")

const thesis = function () {

}


thesis.addThesis = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        console.log(req.file)
        const { title, author, department,year,course } = req.body;
        const pdfPath = req.file.path;
        const originalname = req.file.originalname;
        console.log(pdfPath)

        const newProduct = await thesisModel.create({
            title,
            author,
            department,
            year,
            course,
            pdf_origianl_name : originalname,
            pdf : pdfPath,
        });

        if(newProduct){
            res.status(200).json({ status : true,message: 'Thesis added successfully' });
        }else{
            res.status(200).json({ status : false,message: 'Something went wrong' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


thesis.editThesis = async (req, res) => {
    console.log("edit thesis")
    try {
        const { title, author, department,year } = req.body;
        const {_id} =req.query;
        
        console.log(req.body)
        console.log(_id)
        const document = await thesisModel.findById(_id);
        if(!req.file){
            document.title = title;
            document.author = author;
            document.department = department;
            document.year = year;

            var updatedThesis = await document.save();

            // const pdfPath = req.file.path;
            // const originalname = req.file.originalname;
            // var updateProduct = await thesisModel.save(req.query,{
            //     title,
            //     author,
            //     department,
            //     year,
            //     course,
            //     pdf_origianl_name : originalname,
            //     pdf : pdfPath,
            // });
        }else{
            const pdfPath = req.file.path;
            const originalname = req.file.originalname;
            document.title = title;
            document.author = author;
            document.department = department;
            document.year = year;
            document.pdf_origianl_name = originalname
            document.pdf = pdfPath

            var updatedThesis = await document.save();
        }
        console.log(updatedThesis)
        

        if(updatedThesis){
            res.status(200).json({ status : true,message: 'Thesis updated successfully' });
        }else{
            res.status(200).json({ status : false,message: 'Something went wrong' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

thesis.getThesis = async (req, res, next) => {
    console.log("getUserList")
    try {
        var thesis = await thesisModel.find(req.query)
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

thesis.getThesisById = async (req, res, next) => {
    const {_id} = req.query;
    console.log(_id)
    try {
        var thesis = await thesisModel.findById({_id})
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

thesis.deleteThesis = async (req, res, next) => {
    const { _id } = req.query;
    try {
        var thesis = await thesisModel.findByIdAndDelete(_id)
        if(thesis){
            var apiRes = {status:true,message:'Thesis deleted successfully'}
        }else{
            var apiRes = {status:false, message:'Thesis not found'}
        }
    } catch (error) {
        return res.status(500).send({status:false,message:'Something went wrong.'})
    }
    return res.status(200).send(apiRes)
}


module.exports = thesis;