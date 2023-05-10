import React, { useState, useEffect } from 'react';
import login from '../../assets/images/profile/login.svg';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import img from '../../assets/images/profile/default.png';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsActive(true);
    }
  }, []);

  const onLogout = (e) => {
    // e.prevenDefault();
    localStorage.clear();
    Swal.fire({
      title: 'Logout Success',
      text: `Logout Success!`,
      icon: 'success',
    });
    return navigate('/login');
  };

  // get user
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg py-3 z-1">
          <div className="container-fluid">
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ">
                <Link className={`nav-link me-4`} aria-current="page" to="/">
                  Home
                </Link>
                <Link className={` nav-link me-4`} to="/add">
                  Add Recipe
                </Link>
                <Link className={` nav-link me-4`} to="/profile">
                  Profile
                </Link>
              </div>
              {isActive ? (
                <div className="ms-auto">
                  <Link to="/profile" className="nav-link">
                    <img style={{ border: '3px solid yellow', objectFit: 'cover' }} width="40" height="40" className="rounded-5 me-2" src={profile?.image_profile?.length < 1 ? img : profile?.image_profile} alt="" />
                    <span style={{ fontWeight: '600' }}>{profile.name}</span>
                  </Link>
                </div>
              ) : (
                <div className="ms-auto">
                  <Link to="/profile" className="nav-link">
                    <img className="rounded-5" src={login} alt="" />
                  </Link>
                </div>
              )}

              {isActive ? (
                <button onClick={onLogout} className="btn btn-outline-danger  ms-3 rounded-2">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="nav-link">
                  <button className="btn btn-outline-success  ms-3 rounded-2">Login</button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
