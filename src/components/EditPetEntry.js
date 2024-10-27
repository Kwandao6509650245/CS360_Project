import React, { useEffect, useState } from 'react';
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
import { Edit } from '@mui/icons-material';
import BottomNav from './BottomNav';
import { usePetContext } from '../contexts/PetContext';

const EditPetEntry = () => {
    const { petId, getPet, updatePet } = usePetContext(); // นำเข้า petId, getPet, และ updatePet
    const [name, setName] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [sex, setSex] = useState("");

    useEffect(() => {
        const fetchPetData = async () => {
            const petData = await getPet(petId); // ดึงข้อมูลสัตว์เลี้ยง
            if (petData) {
                setName(petData.name);
                setAnimal(petData.animal);
                setBreed(petData.breed);
                setAge(petData.age);
                setLocation(petData.location);
                setSex(petData.sex);
            }
        };
        fetchPetData();
    }, [petId, getPet]);

    const handleEditPet = async () => {
        const data = JSON.stringify({
            data: {
                name,
                animal,
                breed,
                age,
                location,
                sex
            }
        });

        try {
            await updatePet(petId, data); // ส่งข้อมูลที่แก้ไขไปยัง API
            // แสดงข้อความสำเร็จหรือเปลี่ยนเส้นทางไปยังหน้าอื่น
        } catch (error) {
            console.error('Error updating pet:', error);
            // คุณอาจแสดงข้อความข้อผิดพลาดใน UI
        }
    };

    return (
        <Box component="form" sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' },
            display: 'flex',
            flexDirection: 'column'
        }}
            noValidate
            autoComplete="off">
            <div>
                <Typography variant="h3" gutterBottom component="div">
                    Edit Pet entry
                </Typography>
                <TextField
                    required
                    id="filled-name"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <FormControl variant="outlined" sx={{ m: 1, width: '50ch' }}>
                    <InputLabel id="select-animal-label">Animal *</InputLabel>
                    <Select
                        labelId="select-animal-label"
                        id="filled-animal"
                        value={animal}
                        onChange={(e) => setAnimal(e.target.value)}
                        variant="outlined"
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
                    variant="outlined"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />
                <TextField
                    required
                    id="filled-location-input"
                    label="Location"
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <TextField
                    required
                    id="filled-age"
                    label="Age"
                    type="number"
                    variant="outlined"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <FormControl variant="outlined" sx={{ m: 1, width: '50ch' }}>
                    <InputLabel id="select-sex-label">Sex *</InputLabel>
                    <Select
                        labelId="select-sex-label"
                        id="sex"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        variant="outlined"
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
                <Button variant="outlined" onClick={handleEditPet} startIcon={<Edit />}>
                    Edit Pet Entry
                </Button>
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNav />
            </Paper>
        </Box>
    );
};

export default EditPetEntry; // มีการ export แค่ครั้งเดียว
