import React, { useState, useEffect } from 'react';
import HeaderAuth from '../../components/HeadingText/HeaderAuth';
import style from './register.module.css';
import ButtonAuth from '../../components/ButtonAuth/ButtonAuth';
// import InputAuth from '../../components/InputAuth/InputAuth';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import Swal from 'sweetalert2';
import { UserRegister } from '../../redux/action/authAction';
import { LineWave } from 'react-loader-spinner';

const Register = () => {
  const Navigate = useNavigate();
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
  });

  const onSubmit = (e, body) => {
    e.preventDefault();
    // console.log(form);
    if (dataUser.name === '' || dataUser.email === '' || dataUser.phone === '' || dataUser.password === '' || dataUser.confirmPassword === '') {
      Swal.fire({
        title: 'Register',
        text: 'Enter All Input!',
        icon: 'error',
        dangerMode: true,
      }).then(async (confirm) => {
        if (confirm) {
        }
      });
    } else {
      const body = {
        name: dataUser.name,
        email: dataUser.email,
        phone: dataUser.phone,
        password: dataUser.password,
        confirmPassword: dataUser.confirmPassword,
      };

      if (dataUser.confirmPassword !== dataUser.password) {
        Swal.fire({
          title: 'Register',
          text: 'Password not match!',
          icon: 'error',
          dangerMode: true,
        }).then(async (confirm) => {
          if (confirm) {
          }
        });
      } else {
        UserRegister(body)
          .then((response) => {
            if (response.data.message === 'Register has been success') {
              Swal.fire({
                title: `${response.data.message}`,
                text: 'Register Successfully!',
                icon: 'success',
                dangerMode: true,
              }).then(async (confirm) => {
                if (confirm) {
                  return Navigate('/login');
                }
              });
            } else {
              Swal.fire({
                title: `${response.data.message}`,
                text: 'Register Failed',
                icon: 'error',
                dangerMode: true,
              }).then(async (confirm) => {
                if (confirm) {
                }
              });
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  // const handleChange = (e) => {
  //   setDataUser({
  //     ...dataUser,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (dataUser.name === '' || dataUser.email === '' || dataUser.password === '' || dataUser.phone === '' || dataUser.confirmPassword === '') {
  //     Swal.fire({
  //       title: 'Register Failed',
  //       text: 'Make sure your data is filled!',
  //       icon: 'failed',
  //     });
  //   }
  //   // const body = {
  //   //   name: dataUser.name,
  //   //   email: dataUser.email,
  //   //   password: dataUser.password,
  //   //   phone: dataUser.phone,
  //   //   confirmPassword: dataUser.confirmPassword,
  //   // };
  //   if (dataUser.confirmPassword !== dataUser.password) {
  //     Swal.fire({
  //       title: 'Register',
  //       text: 'Password not match!',
  //       icon: 'error',
  //       dangerMode: true,
  //     }).then(async (confirm) => {
  //       if (confirm) {
  //       }
  //     });
  //   }
  //   axios
  //     .post(`https://izipizy-team.cyclic.app/api/v1/user/register`, dataUser)
  //     .then((response) => {
  //       if (response.data.code !== 200) {
  //         Swal.fire({
  //           title: 'Account Registered',
  //           text: 'Log In to your account now!',
  //           icon: 'success',
  //         });
  //       } else {
  //         Swal.fire({
  //           title: 'Account Registered',
  //           text: 'Log In to your account now!',
  //           icon: 'success',
  //         });
  //       }
  //       // return Navigate('/login');
  //     })
  //     .catch((err) => {
  //       Swal.fire({
  //         title: 'Register Failed',
  //         text: 'Make sure your data is correct!',
  //         icon: 'failed',
  //       });
  //     });
  // };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) {
    return (
      <div
        style={{
          paddingLeft: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#efc81a',
        }}
      >
        <LineWave height="145" width="140" color="white" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
      </div>
    );
  }

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className={`${style.bgImage} col-md-6 bg-image align-items-center`}>
            <div>
              <img className={style.logoCustom} src={require('../../assets/images/auth/barbecue 1.png')} alt="" />
              <p className="text-center mt-2 fw-semibold text-white">Mama Recipe.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className={`${style.login} login d-flex align-items-center py-5`}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <HeaderAuth TitleAuth="Let's Get Started" SpanAuth="Create new account to access all features" />
                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className="mb-3 form-group">
                        <label style={{ color: '#696f79' }} className="formLabel">
                          Name
                        </label>
                        <input onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })} type="text" placeholder="Name" className={`${style.input} form-control mt-2`} id="" aria-describedby="" />
                      </div>
                      <div className="mb-3 form-group">
                        <label style={{ color: '#696f79' }} className="formLabel">
                          Email Address*
                        </label>
                        <input onChange={(e) => setDataUser({ ...dataUser, email: e.target.value })} type="email" placeholder="Enter email address" className={`${style.input} form-control mt-2`} id="" aria-describedby="" />
                      </div>
                      <div className="mb-3 form-group">
                        <label style={{ color: '#696f79' }} className="formLabel">
                          Phone Number
                        </label>
                        <input onChange={(e) => setDataUser({ ...dataUser, phone: e.target.value })} type="text" placeholder="08xxxxxxxxxx" className={`${style.input} form-control mt-2`} id="" aria-describedby="" />
                      </div>
                      <div className="mb-3 form-group">
                        <label style={{ color: '#696f79' }} className="formLabel">
                          Create New Password
                        </label>
                        <input
                          onChange={(e) =>
                            setDataUser({
                              ...dataUser,
                              password: e.target.value,
                            })
                          }
                          type="password"
                          placeholder="Create New Password"
                          className={`${style.input} form-control mt-2`}
                          id=""
                          aria-describedby=""
                        />
                      </div>
                      <div className="mb-3 form-group">
                        <label style={{ color: '#696f79' }} className="formLabel">
                          New Password
                        </label>
                        <input
                          onChange={(e) =>
                            setDataUser({
                              ...dataUser,
                              confirmPassword: e.target.value,
                            })
                          }
                          type="password"
                          placeholder="New Password"
                          className={`${style.input} form-control mt-2`}
                          id=""
                          aria-describedby=""
                        />
                      </div>
                      {/* <InputAuth TypeInput="text" Label="Name" PlaceHolder="Name" />
                      <InputAuth TypeInput="email" Label="Email Address*" PlaceHolder="Enter email address" />
                      <InputAuth TypeInput="number" Label="Phone Number" PlaceHolder="08xxxxxxxxxx" />
                      <InputAuth TypeInput="password" Label="Create New Password" PlaceHolder="Create New Password" />
                      <InputAuth TypeInput="password" Label="New Password" PlaceHolder="New Password" /> */}
                      <div className="mb-3 form-group">
                        <input id="" type="checkbox" className={style.checkboxCustom} />
                        <label style={{ color: '#696f79' }} className="ms-1 form-check-label mb-3">
                          I agree to terms &amp; conditions
                        </label>
                      </div>
                      <div className="mb-3 form-group d-flex justify-content-center">
                        <ButtonAuth Button="Register Account" />
                      </div>
                      <div style={{ textAlign: 'right' }} className="mt-3">
                        <Link className={`${style.anchorText} small text-decoration-none text-secondary`} to="/forgot-password">
                          Forgot Password?
                        </Link>
                      </div>
                      <hr />
                      <div className="mt-3 text-center">
                        <span className={`${style.haveAccount} mb-3`}>Already have account? </span>
                        <Link className={`${style.anchorText} small text-decoration-none text-warning`} to="/login">
                          Log in Here
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
