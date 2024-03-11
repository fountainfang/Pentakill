import React from 'react';
import { render } from '@testing-library/react';
import UserProfile from './Userprofile';

describe('UserProfile Component', () => {
    it('renders user profile information correctly', () => {
        // Render the component
        const { getByText } = render(<UserProfile />);

        // Check if the username, email, and bio are rendered correctly
        expect(getByText('User Profile')).toBeInTheDocument();
        expect(getByText('Username: JohnDoe')).toBeInTheDocument();
        expect(getByText('Email: johndoe@example.com')).toBeInTheDocument();
        expect(getByText('Bio: Hello, I am John Doe. Nice to meet you!')).toBeInTheDocument();
    });
});
