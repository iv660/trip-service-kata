import { UserSession } from "../user/UserSession";
import TripDAO from "./TripDAO";

export interface ITripServiceDependencies {
  userSession?: UserSession;
  dao?: TripDAO;
}
