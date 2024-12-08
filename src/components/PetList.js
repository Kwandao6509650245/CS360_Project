import * as React from 'react';

// mui components
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Brightness4, Brightness7 } from '@mui/icons-material';

// custom components
import BottomNav from './BottomNav';
import PetListItem from './PetListItem';

// data
import { usePetContext } from '../contexts/PetContext';
import { useDarkMode } from '../contexts/DarkModeContext';

// icons
import {
    PersonOutline,
    PetsOutlined,
    LocationOn,
    PunchClockOutlined,
    TransgenderOutlined,
} from '@mui/icons-material';

export default function PetList() {
    const { pets } = usePetContext();
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <Box sx={{ pb: 7 }}>
            <CssBaseline />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 3,
                    position: 'relative',
                    minHeight: '64px',
                    marginTop: '4px',
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    component="div"
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                        color: red,
                    }}
                >
                    Pet List
                </Typography>

                <IconButton
                    onClick={toggleDarkMode}
                    color="inherit"
                    aria-label="toggle dark mode"
                    sx={{
                        position: 'absolute',
                        right: 16,
                    }}
                >
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Box>

            <List>
                {pets &&
                    pets.map(
                        (
                            { id, attributes: { name, animal, breed, location, age, sex, ageType } },
                            i
                        ) => {
                            let ageDisplay = age;
                            if (ageType === 'Unknown') {
                                ageDisplay = 'Unknown';
                            } else {
                                ageDisplay = age + ' ' + ageType;
                            }
                            return (
                                <PetListItem
                                    key={i}
                                    id={id}
                                    petType={animal}
                                    petFieldData={[
                                        { icon: <PersonOutline />, attrib: name },
                                        { icon: <PetsOutlined />, attrib: breed },
                                        { icon: <LocationOn />, attrib: location },
                                        { icon: <PunchClockOutlined />, attrib: ageDisplay },
                                        { icon: <TransgenderOutlined />, attrib: sex },
                                    ]}
                                />
                            );
                        }
                    )}
            </List>

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNav />
            </Paper>
        </Box>
    );
}
