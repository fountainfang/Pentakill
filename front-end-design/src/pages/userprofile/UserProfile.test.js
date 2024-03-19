import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for custom jest matchers
import UserProfile from './UserProfile';

test('renders user profile information', () => {
    // Render the component
    render(<UserProfile />);

    // Check if the rendered component contains the expected elements and data
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('Username: JohnDoe')).toBeInTheDocument();
    expect(screen.getByText('Email: johndoe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bio: Hello, I am John Doe. Nice to meet you!')).toBeInTheDocument();
});
