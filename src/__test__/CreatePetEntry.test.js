import React from 'react';
import { render, screen } from '@testing-library/react';
import CreatePetEntry from '../components/CreatePetEntry';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { usePetContext } from '../contexts/PetContext';

// Mock PetContext at the top level
jest.mock('../contexts/PetContext', () => ({
    usePetContext: jest.fn(),
}));

describe('CreatePetEntry Component', () => {
    let mockCreateNewPet;

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test

        // Create a mock for createNewPet before each test
        mockCreateNewPet = jest.fn();

        // Mock usePetContext to return the mockCreateNewPet function
        usePetContext.mockReturnValue({
            createNewPet: mockCreateNewPet,
        });
    });

    // it should always pass this test case.
    test('renders the form elements correctly', () => {
        render(<CreatePetEntry />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/animal \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/breed/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/sex \*/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add pet entry/i })).toBeInTheDocument();
    });

    // TC1 : Handles input changes from Create Pet Entry
    test('handles input changes', async () => {
        render(<CreatePetEntry />);

        // Simulate typing in the name input
        await userEvent.type(screen.getByLabelText(/name/i), 'Buddy');

        // Open the select for animal
        const animalSelect = screen.getByLabelText(/animal \*/i);
        await userEvent.click(animalSelect);

        // Select the "Dog" option from the dropdown
        const dogOption = await screen.findByText('Dog');
        await userEvent.click(dogOption);

        // Simulate typing in the breed input
        await userEvent.clear(screen.getByLabelText(/breed/i));
        await userEvent.type(screen.getByLabelText(/breed/i), 'Golden Retriever');

        // Simulate typing in the location input
        await userEvent.type(screen.getByLabelText(/location/i), 'Bangkok');

        // Simulate typing in the age input
        await userEvent.type(screen.getByLabelText(/age/i), '3');

        // Open the select for sex
        const sexSelect = screen.getByLabelText(/sex/i);
        await userEvent.click(sexSelect);

        // Select the "Male" option from the dropdown
        const maleOption = await screen.findByText('Male');
        await userEvent.click(maleOption);

        // Assertions for the inputs
        expect(screen.getByLabelText(/name/i)).toHaveValue('Buddy');
        expect(screen.getByLabelText(/breed/i)).toHaveValue('Golden Retriever');
        expect(screen.getByLabelText(/location/i)).toHaveValue('Bangkok');
        expect(screen.getByLabelText(/age/i)).toHaveValue(3);
        expect(await screen.findByText('Dog')).toBeInTheDocument(); // Ensure the selected value is displayed
        expect(await screen.findByText('Male')).toBeInTheDocument(); // Ensure the selected value is displayed
    });

    // TC2 : Calls createNewPet on button click with correct data
    test('calls createNewPet on button click with correct data', async () => {
        render(<CreatePetEntry />);

        // Simulate typing in the form fields
        await userEvent.type(screen.getByLabelText(/name/i), 'Buddy');

        const animalSelect = screen.getByLabelText(/animal \*/i);
        await userEvent.click(animalSelect);
        const dogOption = await screen.findByText('Dog');
        await userEvent.click(dogOption);

        await userEvent.clear(screen.getByLabelText(/breed/i));
        await userEvent.type(screen.getByLabelText(/breed/i), 'Golden Retriever');

        await userEvent.type(screen.getByLabelText(/location/i), 'Bangkok');

        await userEvent.type(screen.getByLabelText(/age/i), '3');

        const sexSelect = screen.getByLabelText(/sex/i);
        await userEvent.click(sexSelect);
        const maleOption = await screen.findByText('Male');
        await userEvent.click(maleOption);

        // Click the "Add Pet Entry" button
        const addButton = screen.getByRole('button', { name: /add pet entry/i });
        await userEvent.click(addButton);

        // Check if createNewPet was called with the correct data
        expect(mockCreateNewPet).toHaveBeenCalledWith(
            JSON.stringify({
                data: {
                    name: 'Buddy',
                    animal: 'Dog',
                    breed: 'Golden Retriever',
                    age: "3", // Keeping age as a string to match the received value
                    location: 'Bangkok',
                    sex: 'Male',
                },
            })
        );               
    });

    // TC3 : Does not call createNewPet if required fields are not filled
    test('does not call createNewPet if required fields are not filled', async () => {
        render(<CreatePetEntry />);

        // Leave the fields empty and click the button
        const addButton = screen.getByRole('button', { name: /add pet entry/i });
        await userEvent.click(addButton);

        // Check if createNewPet was NOT called
        expect(mockCreateNewPet).not.toHaveBeenCalled();
    });
});