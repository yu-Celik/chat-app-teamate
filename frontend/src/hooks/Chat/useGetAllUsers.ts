import { useCallback, useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import { UsersState } from "../../types/Chat.type/Chat.Props";
import { User } from "../../data/userData";


const useGetAllUsers = () => {
    const [usersState, setUsersState] = useState<UsersState>({
        isLoading: false,
        users: []
    });

    const updateUsersState = useCallback((updatedUsers: User[]) => {
        setUsersState(prev => ({ ...prev, users: updatedUsers }));
    }, []);

    useEffect(() => {

        const getAllUsers = async () => {
            console.log('Début de récupération de tous les utilisateurs');
            setUsersState(prev => ({
                ...prev, isLoading: true
            }));

            try {
                const response = await axios.get('/users');
                // console.log('Utilisateurs récupérés:', response.data);

                // Mise à jour de l'état avec tous les utilisateurs récupérés
                setUsersState(prev => ({
                    ...prev,
                    users: response.data,
                    isLoading: false
                }));
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
                setUsersState(prev => ({
                    ...prev, isLoading: false
                }));
            }
        }
        getAllUsers();
    }, []);

    return { usersState, updateUsersState };
}

export default useGetAllUsers;