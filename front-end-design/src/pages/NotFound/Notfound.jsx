import React, { Component } from 'react'
import Navbar from '../Front-Page/Navbar'
import NotFound from '../NotFound/NotFoundImage.jpg'


export default class PageNotfound extends Component {

    componentDidMount() {
        document.title = "Page Not Found";
    }
    componentWillUnmount() {
        document.title = "Default Title";
    }
    render() {

        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            },
            title: {
                fontSize: '4em',
                color: '#555',
            },
            image: {
                width: '50%',
                maxWidth: '300px', // 控制图片的最大宽度
                marginBottom: '20px',
            },
            message: {
                fontSize: '1.5em',
                color: '#777',
            },
        };
        return (
            <>
                <Navbar />
                <div style={styles.container}>
                    <h1 style={styles.title}>404</h1>
                    <img src={NotFound} alt="Not Found" style={styles.image} />
                    <p style={styles.message}>Page not found</p>
                </div>
            </>
        )

    }

}
