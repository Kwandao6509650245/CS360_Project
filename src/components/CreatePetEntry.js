"use client";
import React, { useState } from 'react';

// mui components
import {
    Typography,
    TextField,
    Box,
    Button,
    Paper,
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from '@mui/material';

// icons components
import { Add } from '@mui/icons-material';

// custom components
import BottomNav from './BottomNav';

import { usePetContext } from '../contexts/PetContext';

export default function CreatePetEntry() {
    // input data
    const [name, setName] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [sex, setSex] = useState("");

    // axios
    const { createNewPet } = usePetContext();

    const handleCreateNewPet = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Validate required fields
        if (!name || !animal || !breed || !age || !location || !sex) {
            console.log("All fields are required.");
            return; // Don't proceed if validation fails
        }
        
        const data = JSON.stringify({
            "data": {
                "name": name,
                "animal": animal,
                "breed": breed,
                "age": age,
                "location": location,
                "sex": sex
            }
        });
    
        console.log("Submitting data: ", data); // For debugging purposes
        createNewPet(data); // Call the function
    };    

    return (
        <Box
            component="form"
            onSubmit={handleCreateNewPet} // Handle form submission
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
                display: 'flex',
                flexDirection: 'column'
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Typography variant="h3" gutterBottom component="div">
                    Add new Pet entry
                </Typography>
                <TextField
                    required
                    id="filled-name"
                    label="Name"
                    variant="filled"
                    onChange={(e)=>setName(e.target.value)}
                />
                <FormControl variant="filled" sx={{ m: 1, width: '50ch' }}>
                    <InputLabel id="select-animal-label">Animal *</InputLabel>
                    <Select
                        labelId="select-animal-label"
                        id="filled-animal"
                        value={animal}
                        onChange={(e) => setAnimal(e.target.value)}
                        variant="filled"
                        sx={{ textAlign: 'left' }} 
                        inputProps={{ sx: { textAlign: 'left' } }} 
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Cat">Cat</MenuItem>
                        <MenuItem value="Dog">Dog</MenuItem>
                        <MenuItem value="Bird">Bird</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    id="filled-breed-input"
                    label="Breed"
                    variant="filled"
                    onChange={(e)=>setBreed(e.target.value)}
                />
                <TextField
                    required
                    id="filled-location-input"
                    label="Location"
                    variant="filled"
                    onChange={(e)=>setLocation(e.target.value)}
                />
                <TextField
                    required
                    id="filled-age"
                    label="Age"
                    type="number"
                    variant="filled"
                    onChange={(e)=>setAge(e.target.value)}
                />
                <FormControl variant="filled" sx={{ m: 1, width: '50ch' }}>
                    <InputLabel id="select-sex-label">Sex *</InputLabel>
                    <Select
                        labelId="select-sex-label"
                        id="sex"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        variant="filled"
                        sx={{ textAlign: 'left' }} 
                        inputProps={{ sx: { textAlign: 'left' } }} 
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
            <Button type="submit" variant="outlined" startIcon={<Add />}>
                Add Pet Entry
            </Button>
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNav/>
            </Paper>
        </Box>
    );
}
