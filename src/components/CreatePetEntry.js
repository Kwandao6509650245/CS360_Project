import React, { useState, useContext } from 'react';
import { PetContext } from '../contexts/PetContext'; // นำเข้า PetContext

const CreatePetEntry = () => {
    const { createNewPet } = useContext(PetContext); // ใช้ context
    const [name, setName] = useState('');
    const [animal, setAnimal] = useState('');
    const [breed, setBreed] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // เรียกใช้ createNewPet เมื่อฟอร์มถูกส่ง
        createNewPet({ name, animal, breed, location, age, sex });

        // เคลียร์ฟิลด์ฟอร์ม
        setName('');
        setAnimal('');
        setBreed('');
        setLocation('');
        setAge('');
        setSex('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label="name" // เพิ่ม aria-label สำหรับการเข้าถึง
                />
            </label>
            <label>
                Animal:
                <input
                    type="text"
                    value={animal}
                    onChange={(e) => setAnimal(e.target.value)}
                    aria-label="animal" // เพิ่ม aria-label สำหรับการเข้าถึง
                />
            </label>
            <label>
                Breed:
                <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    aria-label="breed" // เพิ่ม aria-label สำหรับการเข้าถึง
                />
            </label>
            <label>
                Location:
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    aria-label="location" // เพิ่ม aria-label สำหรับการเข้าถึง
                />
            </label>
            <label>
                Age:
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    aria-label="age" // เพิ่ม aria-label สำหรับการเข้าถึง
                />
            </label>
            <label>
                Sex:
                <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    aria-label="sex" // เพิ่ม aria-label สำหรับการเข้าถึง
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </label>
            <button type="submit">Add Pet Entry</button>
        </form>
    );
};

export default CreatePetEntry;
