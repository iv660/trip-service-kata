import "jest";
import { ITripServiceDependencies } from "../src/trip/ITripServiceDependencies";
import Trip from "../src/trip/Trip";
import TripDAO from "../src/trip/TripDAO";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import { UserSession } from "../src/user/UserSession";

describe("TripServiceShould", () => {
    it("should get trips list for a given user", () => {
        const user = new User();
        const loggedUser = new User();
        user.addFriend(loggedUser);

        const userSession = new UserSession();
        userSession.getLoggedUser = () => loggedUser;

        const userTrips: Trip[] = [new Trip()]
        const dao = new TripDAO();
        dao.findTripsByUser = () => userTrips;

        const service = new TripService({userSession, dao});

        const trips: Trip[] = service.getTripsByUser(user);

        expect(trips).toBe(userTrips);
    });
});
