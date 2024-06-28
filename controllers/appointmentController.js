import Appointment from "../models/appointmentModel.js";


export const getAppointment = async (req, res) => {
    const appointments = await Appointment.find();
    return res.send(appointments).status(200);
}

export const appointmentCrl = async (req, res) => {
  
    try {
        const body = req.body;
        const { userId, doctorId, doctorInfo, userInfo} = body;
        const newAppointment = new Appointment({userId, doctorId, doctorInfo, userInfo, });
        const createdAppointment = await newAppointment.save();
        if (!createdAppointment) {
            return res.status(400).json({
                success: false,
                message: "Failed to create appointment",
            });
        }
        res.status(200).json({
            success: true,
            message: "Appointment created successfully",
            appointment: createdAppointment,
        });
    } catch (error) {
        console.log(error, "something error in appointment");
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}