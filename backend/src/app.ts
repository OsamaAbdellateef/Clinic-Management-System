import express, { NextFunction, Request, Response } from "express";
import patientRoutes from "./routes/patient";
import specialtyRoutes from "./routes/specialtyRoute";
import doctorRoutes from "./routes/doctorRoute";
import medicineRouter from "./routes/medicineRoute";
import presRouter from './routes/prescription';
import permissionRoute from './routes/permission'
import AuthRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(permissionRoute);
app.use(presRouter);
app.use(medicineRouter);
app.use(specialtyRoutes);
app.use(doctorRoutes);
new patientRoutes(app);
new AuthRoutes(app)

// notfound middleware
app.use((req, res, next) => {
  res
    .status(404)
    .json({ success: false, message: "your request url is NOT FOUND" });
});

// error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let status = err.status || 500;
  res.status(status).json({ success: false, message: err.message });
});

export default app;
