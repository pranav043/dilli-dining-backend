import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";
import validateResDateTime from "../helper/validateReservation.js";

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  const validationResult = validateResDateTime(date, time);

  if (validationResult) {
    return next(new ErrorHandler(validationResult, 400));
  }

  try {
    await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Your Table has been Reserved Successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};
