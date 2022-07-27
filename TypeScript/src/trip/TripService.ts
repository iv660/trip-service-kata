import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import userSession, { UserSession } from "../user/UserSession";
import { ITripServiceDependencies } from "./ITripServiceDependencies";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    constructor(private dependencies: ITripServiceDependencies = {}) {
        if (undefined === this.dependencies.userSession) {
            this.dependencies.userSession = userSession;
        }

        if (undefined === this.dependencies.dao) {
            this.dependencies.dao = new TripDAO();
        }
    }

    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];
        const loggedUser: User = this.userSession.getLoggedUser();
        let isFriend: boolean = false;

        if (loggedUser != null) {
            for (const friend of user.getFriends()) {
                if (friend === loggedUser) {
                    isFriend = true;
                    break;
                }
            }

            if (isFriend) {
                tripList = this.dao.findTripsByUser(user);
            }

            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

    private get userSession(): UserSession {
        return this.dependencies.userSession;
    }

    private get dao(): TripDAO {
        return this.dependencies.dao;
    }
}
