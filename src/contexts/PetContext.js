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

    // Add new pet
    const createNewPet = async (data) => {
        await http.post("/api/pets", data);
    };

    // Update a pet entry
    const updatePet = async (petId, data) => {
        await http.put(`/api/pets/${petId}`, data);
    };

    // Delete a pet entry
    const deletePet = async (petId) => {
        await http.delete(`/api/pets/${petId}`);
    };

    // Change navigation value
    const changeNavValue = (value) => {
        set_nav_value(value);
    };

    // Get pet by ID
    const getPetById = async (id) => {
        try {
            const response = await http.get(`/api/pets/${id}`);
            return response.data; // ปรับให้ตรงกับโครงสร้างข้อมูลที่ได้รับ
        } catch (error) {
            console.error("Failed to fetch pet by ID:", error);
            throw error;
        }
    };

    // Get pet ID value
    const getPetId = (id) => {
        setPetId(id);
    };

    useEffect(() => {
        const readAllPets = async () => {
            try {
                const response = await http.get("/api/pets");
                if (response.data) { // ปรับการตรวจสอบเป็น response.data เท่านั้น
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

    // Context value
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

    // Provide context
    return (
        <PetContext.Provider value={value}>
            {children}
        </PetContext.Provider>
    );
};
