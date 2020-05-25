import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all() {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const found = this.appointments.find((a) => isEqual(a.date, date));

    return found || null;
  }

  public create({ provider, date }: CreateAppointmentDTO) {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default new AppointmentsRepository();
