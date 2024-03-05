import React from 'react';
import { mount } from 'enzyme';
import Signupform from 'Signupform';
import api from '../../api';

jest.mock('../../api');

describe('Signupform Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Signupform />);
    });

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('should handle form submission', async () => {
        // 模拟输入框值变化
        wrapper.find('input[name="username"]').simulate('change', { target: { name: 'username', value: 'testuser' } });
        wrapper.find('input[name="email"]').simulate('change', { target: { name: 'email', value: 'test@example.com' } });
        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'testpassword' } });
        wrapper.find('input[name="passwordConfirmation"]').simulate('change', { target: { name: 'passwordConfirmation', value: 'testpassword' } });

        // 模拟表单提交
        await wrapper.find('form').simulate('submit');

        // 检查状态更新
        expect(wrapper.state('username')).toEqual('testuser');
        expect(wrapper.state('email')).toEqual('test@example.com');
        expect(wrapper.state('password')).toEqual('testpassword');
        expect(wrapper.state('passwordConfirmation')).toEqual('testpassword');

        // 检查API调用
        expect(api.register).toHaveBeenCalledWith({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
            passwordConfirmation: 'testpassword',
        });
    });
});
