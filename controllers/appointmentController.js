import Appointment from "../models/appointmentModel.js";
import User from "../models/userModel.js";

export const appointmentCrl = async (req, res) => {
    try {
        req.body.status = 'pending';
        const newAppointment = new Appointment (req.body);
        await newAppointment.save();
        const user = await User.findOne({ email: req.body.email });
        user.notifications.push({
            type: 'New-Appointment request',
            message: `A new appointment requist from ${req.body.userInfo.firstName}`,
            onClickPath: '/user/appointments'
        })
        await user.save();
        res.status(200).send({
            message: "Appointment booked successfully",
            success: true,
            data: newAppointment,
        })
    } catch (error) {
        console.log(error);
        res.json({ error, message: "Error while booking appointment" , success: false });
    }
}