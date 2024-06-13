import { cloudinaryInstance } from "../config/cloudinary.js";
import Service from "../models/serviceModel.js";

export const getServices = async (req, res) => {
    const services = await Service.find();
    return res.send(services).status(200);
};

export const createService = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({success: false, message: "no file provided"});
        }

        cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err, "error");
                return res.status(500).json({
                    success: false,
                    message: "error",
                });
            }
            console.log(result);
            const imgUrl = result.url;
            const body = req.body;
            console.log(body, "body");
            const { title, description } = body;
            const newService = new Service({
                title,
                description,
                image: imgUrl,
            });

            const createdServices = await newService.save();
            if (!createdServices) {
                return console.log("somthing went wrong")
            }
            return res.send(createdServices);
        });
    } catch (error) {
        console.log("somthing error", error);
        res.send("error creating service").status(201);
    }
};

export const updateService = async (req, res) => {
    const id = req.params.id;

    const { title, description } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
        { _id: id}, 
        { title, description }, 
        { new: true }
    );

    if (!updatedService) {
        return res.send("Service not updated");
    }
    console.log(updatedService);
    return res.send(updatedService);
};

export const deleteService = async (req, res) => {
    const id = req.params.id;
    const deletedService = await Service.findByIdAndDelete({ _id: id });
    if (!deletedService) {
        return res.send("Service not deleted");
    }
    return res.send(  "Service deleted successfully");
};