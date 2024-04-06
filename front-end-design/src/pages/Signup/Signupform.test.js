import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the Jest DOM extensions

import Signupform from './signupform'; // Update the path to your component

describe('Signupform component', () => {
    it('should render and submit form', async () => {
        render(<Signupform />);

        // Fill in form fields
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('PasswordConfirmation'), { target: { value: 'password123' } });

        // Submit the form
        fireEvent.click(screen.getByText('submit'));

        // Wait for the asynchronous registration logic to complete
        await waitFor(() => {
            // Check if the success message is displayed
            expect(screen.getByText('Registration successful!')).toBeInTheDocument();
        });
    });

    // Add more test cases as needed
});
