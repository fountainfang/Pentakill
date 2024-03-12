import React from 'react';
import { mount } from 'enzyme';
import Signinform from 'Signinform';

describe('Signinform component', () => {
    it('should handle form submission and update state', () => {
        const wrapper = mount(<Signinform />);

        // Simulate input change
        wrapper.find('input[name="username"]').simulate('change', {
            target: { name: 'username', value: 'testuser' },
        });

        wrapper.find('input[name="password"]').simulate('change', {
            target: { name: 'password', value: 'testpassword' },
        });

        // Simulate form submission
        wrapper.find('form').simulate('submit');

        // Check if the state is updated correctly
        expect(wrapper.state('username')).toEqual('testuser');
        expect(wrapper.state('password')).toEqual('testpassword');

        // Optionally, you can check if the console.log statement was called
        // This is just an example; in a real test, you might want to spy on console.log
        // and check if it's called with the expected arguments.
        const consoleSpy = jest.spyOn(console, 'log');
        expect(consoleSpy).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'testpassword',
        });

        // Clean up
        consoleSpy.mockRestore();
    });
});
