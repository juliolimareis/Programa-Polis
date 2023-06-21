import { H3Event, } from "h3";

declare global {
  export enum UserType {
    ADMIN = 2,
    USER = 1,
    DISABLED = 0
  }

  interface User {
    id: string;
    name: string;
    email: string;
    passwd: string;
    createdAt?: Date;
    type: UserType;
    remoteAccess: string;
    secretaryId: number;
  }

  interface Ticket {
    id: number;
    userId: number;
    status: number;
    subject: string;
    desc: string;
    priority: number;
  }

  interface TicketList extends Ticket {
    user: User
  }

  type CreateTicket = Omit<Ticket, "id" | "createdAt" | "status" | "userId", "priority">;
  type CreateUser = Omit<User, "id" | "createdAt" | "id" | "status">;

  interface Login {
    email: string;
    passwd: string;
  }

  interface TicketState {
    id: number;
    desc: string;
    ticketId: number;
    createdAt: Date;
  }

  interface DataToken {
    id: number;
    name: string;
    email: string;
    type: number;
    iat: number;
    exp: number;
  }

  interface ApiEvent extends H3Event {
    dataToken: DataToken
  }

}