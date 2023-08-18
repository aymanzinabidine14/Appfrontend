import React from 'react';
import axios from "axios";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBContainer,
  MDBNavbar,
  MDBInputGroup,
  MDBIcon,
  MDBInput,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge,
} from 'mdb-react-ui-kit';
import { MDBFooter, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import {  MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';




 function Dashboard() {

  async function AdminDashboard(event) {
    this.state = {
      users: []
 }
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/user/Users", {
        
        }).then((data) => 
        {
            this.setState({ users: data })
            console.log(this.state.data)
         
      }, fail => {
       console.error(fail); // Error!
});
    }

     catch (err) {
      alert(err);
    }
  }
  
  return (
   
    <div>
     
  
     <header>
        {/* Main Navigation */}
        <MDBNavbar expand='lg' light className='bg-white'>
          {/* Container wrapper */}
          <MDBContainer fluid>
            {/* Search form */}
            <MDBInputGroup textAfter={<MDBIcon fas icon='search' />} noBorder>
              <MDBInput
                autoComplete='off'
                className='active'
                type='search'
                placeholder='Search (ctrl + "/" to focus)'
                style={{ minWidth: '225px' }}
              />
            </MDBInputGroup>
  
            {/* Right links */}
            <MDBNavbarNav className='d-flex flex-row' right fullWidth={false}>
              {/* Notification dropdown */}
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag='a' className='hidden-arrow me-3 me-lg-0 nav-link' style={{ cursor: 'pointer' }}>
                    <MDBIcon fas icon='bell' />
                    <MDBBadge pill notification color='danger'>
                      1
                    </MDBBadge>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Some news</MDBDropdownItem>
                    <MDBDropdownItem link>Another news</MDBDropdownItem>
                    <MDBDropdownItem link>Something else</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
  
              {/* Icon dropdown */}
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag='a' className='hidden-arrow me-3 me-lg-0 nav-link'>
                    <MDBIcon flag='united-kingdom' className='m-0' />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>
                      <MDBIcon flag='united-kingdom' />
                      English
                      <MDBIcon fas icon='check' color='success' className='ms-2' />
                    </MDBDropdownItem>
                    <MDBDropdownItem>{/* <MDBDropdownDivider></MDBDropdownDivider> */}</MDBDropdownItem>
                    <MDBDropdownItem link>
                      <MDBIcon flag='poland' />
                      Polski
                    </MDBDropdownItem>
                    <MDBDropdownItem link>
                      <MDBIcon flag='china' />
                      中文
                    </MDBDropdownItem>
                    <MDBDropdownItem link>
                      <MDBIcon flag='japan' />
                      日本語
                    </MDBDropdownItem>
                    <MDBDropdownItem link>
                      <MDBIcon flag='germany' />
                      Deutsch
                    </MDBDropdownItem>
                    <MDBDropdownItem link>
                      <MDBIcon flag='spain' />
                      Español
                    </MDBDropdownItem>
                    <MDBDropdownItem link>
                      <MDBIcon flag='russia' />
                      Русский
                    </MDBDropdownItem>
                    <MDBDropdownItem link>
                      <MDBIcon flag='portugal' />
                      Português
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
  
              {/* Avatar */}
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag='a' className='hidden-arrow d-flex align-items-center nav-link'>
                    <img
                      src='https://mdbootstrap.com/img/new/avatars/2.jpg'
                      className='rounded-circle'
                      height='22'
                      alt='Avatar'
                      loading='lazy'
                    />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>MyProfile</MDBDropdownItem>
                    <MDBDropdownItem link>Settings</MDBDropdownItem>
                    <MDBDropdownItem link>Logout</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBContainer>
        </MDBNavbar>
  
        {/* Heading */}
        <div className='p-5 bg-light mb-4'>
          <h1>Dashboard</h1>
          {/* Breadcrumb */}
          <MDBContainer fluid>
            <MDBBreadcrumb bold>
              <MDBBreadcrumbItem>
                <a href='' className='text-reset'>
                  Home
                </a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href='' className='text-reset'>
                  Analytics
                </a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href='' className='text-reset'>
                  <u>MeetX</u>
                </a>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBContainer>
        </div>
      </header>

    
    
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Title</th>
          <th scope='col'>Status</th>
          <th scope='col'>Position</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody >
        <tr>
     <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>yasser@gmail</p>
                <p className='text-muted mb-0'>yasser</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>Software engineer</p>
            <p className='text-muted mb-0'>IT department</p>
          </td>
          <td>
            <MDBBadge color='success' pill>
              Active
            </MDBBadge>
          </td>
          <td>Senior</td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              details
            </MDBBtn>
          </td>
        </tr>
     </MDBTableBody>
    </MDBTable>
    <footer>
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                MEETX°
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Casablanca, Maarif
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info.MeetX@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://MeetX.com/'>
          MeetX.com
        </a>
      </div>
    </MDBFooter>

        </footer>
        </div>
  );
}
export default Dashboard;