import React from 'react';
import Navbar from '../../component/Navbar';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        // 初始化用户数据
        this.state = {
            username: 'JohnDoe',
            email: 'johndoe@example.com',
            bio: 'Hello, I am John Doe. Nice to meet you!',
        };
    }

    render() {
        return (
            <>
                <Navbar />
                <div>



                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <h1>User Profile</h1>
                            <div>
                                <strong>Username:</strong> {this.state.username}
                            </div>
                            <div>
                                <strong>Email:</strong> {this.state.email}
                            </div>
                            <div>
                                <strong>Bio:</strong> {this.state.bio}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'></div>
                </div>


            </>
        );
    }
}

export default UserProfile;
