import * as React from 'react';


import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';


import BottomNav from './BottomNav';
import PetListItem from './PetListItem';

import { usePetContext } from '../contexts/PetContext';


import {
    PersonOutline,
    PetsOutlined,
    LocationOn,
    PunchClockOutlined,
    TransgenderOutlined,
} from '@mui/icons-material';

export default function PetList() {
    const { pets } = usePetContext();

    return (
        <Box sx={{ pb: 7 }}>
            <CssBaseline />
            <List>
                {
                    pets && pets.map(
                        ({ id, attributes: { name, animal, breed, location, age, sex } }, i) => (
                            <PetListItem
                                key={i}
                                id={id}
                                petType={animal}
                                petFieldData={[
                                    { icon: <PersonOutline />, attrib: name },
                                    { icon: <PetsOutlined />, attrib: breed },
                                    { icon: <LocationOn />, attrib: location },
                                    { icon: <PunchClockOutlined />, attrib: age },
                                    { icon: <TransgenderOutlined />, attrib: sex }
                                ]}
                            />
                        ))
                }
            </List>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNav />
            </Paper>
        </Box>
    );
};