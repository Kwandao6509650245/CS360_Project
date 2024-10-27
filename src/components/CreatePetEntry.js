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


        createNewPet({ name, animal, breed, location, age, sex });


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
                    aria-label="name"
                />
            </label>
            <label>
                Animal:
                <input
                    type="text"
                    value={animal}
                    onChange={(e) => setAnimal(e.target.value)}
                    aria-label="animal"
                />
            </label>
            <label>
                Breed:
                <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    aria-label="breed"
                />
            </label>
            <label>
                Location:
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    aria-label="location"
                />
            </label>
            <label>
                Age:
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    aria-label="age"
                />
            </label>
            <label>
                Sex:
                <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    aria-label="sex"
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
