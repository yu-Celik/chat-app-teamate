import { CurrentUser } from "./Auth.Props";

export type AuthContextProps = {
    currentUser: CurrentUser;
    setCurrentUser: (value: CurrentUser) => void;
}