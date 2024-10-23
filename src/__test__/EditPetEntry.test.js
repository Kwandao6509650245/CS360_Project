import React from 'react';
import { render, screen } from '@testing-library/react';
import EditPetEntry from '../components/EditPetEntry';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { usePetContext } from '../contexts/PetContext';

// Mock PetContext
jest.mock('../contexts/PetContext', () => ({
    usePetContext: jest.fn(),
}));

describe('EditPetEntry Component', () => {
    let mockUpdatePet, mockPetId;

    const mockPetData = {
        name: 'Charlie',
        animal: 'Cat',
        breed: 'Persian',
        age: "4",
        location: 'New York',
        sex: 'Male'
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test

        // Create mocks for updatePet and petId
        mockUpdatePet = jest.fn();
        mockPetId = 1;

        // Mock usePetContext to return mockUpdatePet and mockPetId
        usePetContext.mockReturnValue({
            updatePet: mockUpdatePet,
            petId: mockPetId,
            petData: mockPetData
        });
    });

    // it should always pass this test case.
    test('renders the form elements correctly', () => {
        render(<EditPetEntry />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/animal \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/breed/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/sex \*/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /edit pet entry/i })).toBeInTheDocument();
    });

    // TC4 : Handles input changes from Edit Pet Entry
    test('handles input changes', async () => {
        render(<EditPetEntry />);

        // Simulate typing in the name input
        await userEvent.type(screen.getByLabelText(/name/i), 'Charlie');

        // Open the select for animal
        const animalSelect = screen.getByLabelText(/animal \*/i);
        await userEvent.click(animalSelect);

        // Select the "Dog" option from the dropdown
        const dogOption = await screen.findByText('Cat');
        await userEvent.click(dogOption);

        // Simulate typing in the breed input
        await userEvent.clear(screen.getByLabelText(/breed/i));
        await userEvent.type(screen.getByLabelText(/breed/i), 'Persian');

        // Simulate typing in the location input
        await userEvent.type(screen.getByLabelText(/location/i), 'New York');

        // Simulate typing in the age input
        await userEvent.type(screen.getByLabelText(/age/i), '4');

        // Open the select for sex
        const sexSelect = screen.getByLabelText(/sex/i);
        await userEvent.click(sexSelect);

        // Select the "Male" option from the dropdown
        const maleOption = await screen.findByText('Male');
        await userEvent.click(maleOption);

        // Assertions for the inputs
        expect(screen.getByLabelText(/name/i)).toHaveValue('Charlie');
        expect(screen.getByLabelText(/breed/i)).toHaveValue('Persian');
        expect(screen.getByLabelText(/location/i)).toHaveValue('New York');
        expect(screen.getByLabelText(/age/i)).toHaveValue(4);
        expect(await screen.findByText('Cat')).toBeInTheDocument(); // Ensure the selected value is displayed
        expect(await screen.findByText('Male')).toBeInTheDocument(); // Ensure the selected value is displayed
    });

    // TC5 : Calls updatePet on button click with correct data
    test('calls updatePet on button click with correct data', async () => {
        render(<EditPetEntry />);

        // Simulate typing in the form fields
        await userEvent.type(screen.getByLabelText(/name/i), 'Charlie');

        const animalSelect = screen.getByLabelText(/animal \*/i);
        await userEvent.click(animalSelect);
        const dogOption = await screen.findByText('Cat');
        await userEvent.click(dogOption);

        await userEvent.clear(screen.getByLabelText(/breed/i));
        await userEvent.type(screen.getByLabelText(/breed/i), 'Persian');

        await userEvent.type(screen.getByLabelText(/location/i), 'New York');

        await userEvent.type(screen.getByLabelText(/age/i), '4');

        const sexSelect = screen.getByLabelText(/sex/i);
        await userEvent.click(sexSelect);
        const maleOption = await screen.findByText('Male');
        await userEvent.click(maleOption);

        // Click the "Edit Pet Entry" button
        const editButton = screen.getByRole('button', { name: /edit pet entry/i });
        await userEvent.click(editButton);

        // Check if updatePet was called with the correct data
        expect(mockUpdatePet).toHaveBeenCalledWith(
            mockPetId,
            JSON.stringify({
                data: {
                    name: 'Charlie',
                    animal: 'Cat',
                    breed: 'Persian',
                    age: "4", // Keeping age as a string to match the received value
                    location: 'New York',
                    sex: 'Male',
                },
            })
        );
    });

    // TC6 : Should not have the same values as the initial mock repo after editing
    test('should not have the same values as the initial mock repo after editing', async () => {
        render(<EditPetEntry />);

        // Simulate changing each input field to something different from the mock repo
        await userEvent.clear(screen.getByLabelText(/name/i));
        await userEvent.type(screen.getByLabelText(/name/i), 'Max');

        const animalSelect = screen.getByLabelText(/animal \*/i);
        await userEvent.click(animalSelect);
        const dogOption = await screen.findByText('Dog');
        await userEvent.click(dogOption);

        await userEvent.clear(screen.getByLabelText(/breed/i));
        await userEvent.type(screen.getByLabelText(/breed/i), 'Golden Retriever');

        await userEvent.clear(screen.getByLabelText(/location/i));
        await userEvent.type(screen.getByLabelText(/location/i), 'Los Angeles');

        await userEvent.clear(screen.getByLabelText(/age/i));
        await userEvent.type(screen.getByLabelText(/age/i), '5');

        const sexSelect = screen.getByLabelText(/sex/i);
        await userEvent.click(sexSelect);
        const femaleOption = await screen.findByText('Female');
        await userEvent.click(femaleOption);

        // Click the "Edit Pet Entry" button
        const editButton = screen.getByRole('button', { name: /edit pet entry/i });
        await userEvent.click(editButton);

        // Ensure the updated values are NOT the same as the mock repo values
        expect(mockUpdatePet).toHaveBeenCalledWith(
            mockPetId,
            JSON.stringify({
                data: {
                    name: 'Max',               // Changed from 'Charlie' to 'Max'
                    animal: 'Dog',             // Changed from 'Cat' to 'Dog'
                    breed: 'Golden Retriever', // Changed from 'Persian' to 'Golden Retriever'
                    age: "5",                  // Changed from "4" to "5"
                    location: 'Los Angeles',   // Changed from 'New York' to 'Los Angeles'
                    sex: 'Female',             // Changed from 'Male' to 'Female'
                },
            })
        );

        // Ensure the values differ from the mock repo
        expect(mockUpdatePet).not.toHaveBeenCalledWith(
            mockPetId,
            JSON.stringify({
                data: mockPetData, // Ensure it's different from the original mock data
            })
        );
    });
});
