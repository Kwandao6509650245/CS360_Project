import React, { createContext, useContext, useEffect, useState } from 'react';
import http from '../http';

const PetContext = createContext();

export const usePetContext = () => {
    return useContext(PetContext);
};

export const PetProvider = ({ children }) => {
    const [pets, setPets] = useState([]);
    const [nav_value, set_nav_value] = useState("PetList");
    const [petId, setPetId] = useState("");


    const createNewPet = async (data) => {
        await http.post("/api/pets", data);
    };


    const updatePet = async (petId, data) => {
        await http.put(`/api/pets/${petId}`, data);
    };


    const deletePet = async (petId) => {
        await http.delete(`/api/pets/${petId}`);
    };


    const changeNavValue = (value) => {
        set_nav_value(value);
    };


    const getPetById = async (id) => {
        try {
            const response = await http.get(`/api/pets/${id}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch pet by ID:", error);
            throw error;
        }
    };

    const getPetId = (id) => {
        setPetId(id);
    };

    useEffect(() => {
        const readAllPets = async () => {
            try {
                const response = await http.get("/api/pets");
                if (response.data) {
                    const responseArr = Object.values(response.data);
                    setPets(responseArr);
                } else {
                    console.error("Invalid response structure:", response.data);
                }
            } catch (error) {
                console.error("Failed to fetch pets:", error);
            }
        };

        readAllPets();
    }, []);


    const value = {
        createNewPet,
        pets,
        updatePet,
        deletePet,
        changeNavValue,
        nav_value,
        getPetId,
        petId,
        getPetById
    };


    return (
        <PetContext.Provider value={value}>
            {children}
        </PetContext.Provider>
    );
};
