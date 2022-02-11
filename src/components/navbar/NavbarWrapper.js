import React, { useContext, useState } from 'react'
import { Navbar, Container, Nav, Offcanvas, NavDropdown, Form, FormControl, Button, Image, Dropdown } from 'react-bootstrap';
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from '../../Auth';

export default function NavbarWrapper() {
    const { currentUser } = useContext(AuthContext);

    const signout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Sign-out successful.')
        }).catch((error) => {
            console.error('Error', error)
            // An error happened.
        });
    }
    // <Button onClick={() => signout()} variant="outline-dark">Sign out</Button>
    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            
        >
            {children}
            
        </a>
    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <p>{currentUser.displayName}</p>
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                    <Button onClick={() => signout()} variant="outline-dark">Sign out</Button>
                </div>
            );
        },
    );

    return (<>

        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home" style={{ 'marginLeft': '10px' }}>
                {/* <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '} */}
                ChatWidget
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end" style={{ 'marginRight': '10px' }}>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        <Image style={{ 'width': '45px', 'height': '45px' }} referrerPolicy='no-referrer' src={currentUser.photoURL} roundedCircle='true' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}
