import Appointment from "../models/appointmentModel.js";
// import User from "../models/userModel.js";

export const getAppointment = async (req, res) => {
    const appointments = await Appointment.find();
    return res.send(appointments).status(200);
}

export const appointmentCrl = async (req, res) => {
    // try {
    //     req.body.status = 'pending';
    //     const newAppointment = new Appointment (req.body);
    //     await newAppointment.save();
    //     const user = await User.findOne({ email: req.body.email });
    //     user.notifications.push({
    //         type: 'New-Appointment request',
    //         message: `A new appointment requist from ${req.body.userInfo.firstName}`,
    //         onClickPath: '/user/appointments'
    //     })
    //     await user.save(); 
    //     res.status(200).send({
    //         message: "Appointment booked successfully",
    //         success: true,
    //         data: newAppointment,
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.json({ error, message: "Error while booking appointment" , success: false });
    // }
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