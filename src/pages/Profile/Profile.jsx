import React, { useState, useEffect, useRef } from 'react';
import iconEdit from '../../assets/images/profile/Vector.png';
import style from '../../pages/Profile/style.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navs from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { updateRecipe } from '../../redux/action/recipeAction';
import { deleteRecipe } from '../../redux/action/recipeAction';
import { deleteSaveds } from '../../redux/action/recipeAction';
import { deleteLikeds } from '../../redux/action/recipeAction';
import { LineWave } from 'react-loader-spinner';

// aos
import AOS from 'aos';
import 'aos/dist/aos.css';

const Profile = () => {
  const [view, setView] = useState('MyRecipe');

  useEffect(() => {
    getOwnProduct();
    getSavedProduct();
    getLikedProduct();
  }, []);

  // Get Product
  const [ownProduct, setOwnProduct] = useState([]);
  const getOwnProduct = () => {
    const token = localStorage.getItem('token');
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/v1/recipe/myrecipe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOwnProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Saved Product
  const [savedProduct, setSavedProduct] = useState([]);
  const getSavedProduct = () => {
    const token = localStorage.getItem('token');
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/v1/saved/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSavedProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteSaved = (id) => {
    dispatch(deleteSaveds(id));
  };

  // Liked Product
  const [likedProduct, setLikedProduct] = useState([]);
  const getLikedProduct = () => {
    const token = localStorage.getItem('token');
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/v1/liked/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLikedProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteLiked = (id) => {
    dispatch(deleteLikeds(id));
  };

  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('users'));
  const id = data.id;
  // get user
  const [profile, setProfile] = useState({
    id: '',
    name: '',
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // update user
  const onUpdateusers = (e) => {
    e.preventDefault();
    const formDatas = new FormData();
    formDatas.append('id', profile.id);
    formDatas.append('name', profile.name);
    formDatas.append('image', images);
    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/v1/user/edit/${profile.id}`, formDatas, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        Swal.fire({
          title: 'Update Users Success',
          icon: 'success',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [images, setImages] = useState(null);
  const handleImageChanges = (event) => {
    setImages(event.target.files[0]);
  };

  const [videos, setVideos] = useState(null);
  const handleVideoChanges = (event) => {
    setVideos(event.target.files[0]);
  };

  const handleInputChanges = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  // get detail recipe
  const [detailProduct, setDetailProduct] = useState({
    id: '',
    name_recipe: '',
    ingredients: '',
    video: '',
    description: '',
    image: '',
  });
  const getDetailProduct = (id) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/v1/recipe/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setDetailProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dispatch = useDispatch();
  // update recipe
  const onUpdateProduct = (e) => {
    e.preventDefault();
    dispatch(updateRecipe(detailProduct, image, videos));
  };

  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleInputChange = (event) => {
    setDetailProduct({
      ...detailProduct,
      [event.target.name]: event.target.value,
    });
  };

  // delete recipe
  const deleteProduct = (id) => {
    dispatch(deleteRecipe(id));
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

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
    <>
      <Navs />
      <section className={style.margin}>
        <div className={style.boxContainer}>
          <div className={style.box}>
            <div className={style.containerOne}>
              <div className={style.profile}>
                <img src={profile.image_profile ? profile.image_profile : require('../../assets/images/profile/img-profile.png')} alt="" className={`${style.userProfile} ms-2`} data-aos="fade-right" data-aos-duration="1000" />

                <button style={{ border: 'none' }} type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <img
                    src={iconEdit}
                    alt="edit"
                    className={style.iEdit}
                    data-aos="fade-left"
                    data-aos-duration="1500"
                    // onClick={handleClick}
                  />
                </button>

                {/* modal body */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Update Profile
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <form
                        onSubmit={(e) => {
                          onUpdateusers(e);
                        }}
                      >
                        <div className="modal-body">
                          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Name" name="name" value={profile.name} onChange={(e) => handleInputChanges(e)} />
                          <input type="file" className="form-control mt-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="image" onChange={handleImageChanges} />
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                            Close
                          </button>
                          <button type="submit" className="btn btn-outline-warning">
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* modal body end */}

                <h3 data-aos="fade-left" data-aos-duration="1000" style={{ fontWeight: '600' }}>
                  {profile.name}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mt-3">
          <div>
            {view === 'MyRecipe' ? (
              <>
                <button onClick={() => setView('MyRecipe')} style={{ border: 'none', background: 'none' }} className={`${style.list} me-4`}>
                  My Recipe
                </button>
                <button onClick={() => setView('saveRecipe')} style={{ border: 'none', background: 'none' }} className={`${style.list} me-4`}>
                  Save Recipe
                </button>
                <button onClick={() => setView('likedRecipe')} style={{ border: 'none', background: 'none' }} className={`${style.list} me-4`}>
                  Liked Recipe
                </button>
              </>
            ) : view === 'saveRecipe' ? (
              <>
                <button onClick={() => setView('MyRecipe')} style={{ border: 'none', background: 'none' }} className={`${style.list} me-4`}>
                  My Recipe
                </button>
                <button onClick={() => setView('saveRecipe')} style={{ border: 'none', background: 'none' }} className={`${style.list} me-4`}>
                  Save Recipe
                </button>
                <button onClick={() => setView('likedRecipe')} style={{ border: 'none', background: 'none' }} className={`${style.list} me-4`}>
                  Liked Recipe
                </button>
              </>
            ) : view === 'likedRecipe' ? (
              <>
                <button onClick={() => setView('MyRecipe')} style={{ border: 'none', background: 'none' }} className={`${style.list} me-4`}>
                  My Recipe
                </button>
                <button onClick={() => setView('saveRecipe')} style={{ border: 'none', background: 'none' }} className={`${style.list} me-4`}>
                  Save Recipe
                </button>
                <button onClick={() => setView('likedRecipe')} style={{ border: 'none', background: 'none' }} className={`${style.list} me-4`}>
                  Liked Recipe
                </button>
              </>
            ) : (
              ''
            )}
            <hr />
          </div>
          <div className="container">
            {view === 'MyRecipe' ? (
              <div className="">
                <div className="row">
                  {ownProduct.map((data) => (
                    <div className="col-4 mb-5 me-4">
                      <div className={style.wrapper}>
                        <img className="me-3 rounded-4" style={{ width: '100%', height: '100%' }} src={data.image} alt="" />
                        <span className={` ${style.titleImage}`}>{data.name_recipe}</span>

                        <div className={style.dd}>
                          <div className={style.titlebtn}>
                            <button onClick={(e) => deleteProduct(data.id, e)} className={` btn btn-danger me-2`}>
                              delete
                            </button>
                            <button data-bs-toggle="modal" data-bs-target="#edit" className={` btn btn-success me-4`} onClick={(e) => getDetailProduct(data.id, e)}>
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="modal fade" id="edit" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h2 className="modal-title fs-5 text-dark" id="editLabel">
                          Update Recipe
                        </h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>

                      <form
                        onSubmit={(e) => {
                          onUpdateProduct(e);
                        }}
                      >
                        <div className="modal-body">
                          <input type="file" className="form-control taprofil" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Change Photo" name="image" onChange={handleImageChange} />
                          <input type="text" className="form-control mt-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="name_recipe" value={detailProduct.name_recipe} onChange={handleInputChange} />
                          <textarea type="text" className="form-control mt-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="ingredients" value={detailProduct.ingredients} onChange={handleInputChange} />
                          <input type="file" className="form-control mt-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="video" onChange={handleVideoChanges} />
                          <textarea type="text" className="form-control mt-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="description" value={detailProduct.description} onChange={handleInputChange} />
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : view === 'saveRecipe' ? (
              <div className="row">
                {savedProduct.map((data) => (
                  <div className="col-4 mb-4  me-4">
                    <div className={style.wrapper}>
                      <img className="rounded-4" style={{ width: '100%', height: '100%' }} src={data.image} alt="" />
                      <span className={style.titleImage}>{data.name_recipe}</span>
                      <div className={style.dd}>
                        <div className={style.titlebtn}>
                          <button onClick={(e) => deleteSaved(data.id, e)} className={` btn btn-danger me-2`}>
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : view === 'likedRecipe' ? (
              <div className="row">
                {likedProduct.map((data) => (
                  <div className="col-4 mb-4  me-4">
                    <div className={style.wrapper}>
                      <img className="rounded-4" style={{ width: '100%', height: '100%' }} src={data.image} alt="" />
                      <span className={style.titleImage}>{data.name_recipe}</span>
                      <div className={style.dd}>
                        <div className={style.titlebtn}>
                          <button onClick={(e) => deleteLiked(data.id, e)} className={` btn btn-danger me-2`}>
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Profile;
