import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// import axios from 'axios';

import style from './detail.module.css';

import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/Footer';
import CommentList from '../../components/CommentList';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getComment, getDetailRecipe } from '../../redux/action/recipeAction';
import { LineWave } from 'react-loader-spinner';
const DetailRecipe = () => {
  // effect
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // get recipe by id recipe
  const [recipe, setRecipe] = useState([{}]);
  useEffect(() => {
    dispatch(getDetailRecipe(setRecipe, id));
  }, []);

  const handleVideo = () => {
    navigate(`/video/${id}`);
  };
  // create save
  const [save, setSave] = useState({
    recipe_id: `${id}`,
  });

  const [saveActive, setSaveActive] = useState(false);

  const handleSave = () => {
    if (!saveActive) {
      setSaveActive(true);
      axios
        .post(`${process.env.REACT_APP_BACKEND}/api/v1/saved`, save, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Success',
            text: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          // handle error
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  // create like
  const [likes, setLikes] = useState({
    recipe_id: `${id}`,
  });
  const [likeActive, setLikeActive] = useState(false);

  const handleLike = () => {
    if (!likeActive) {
      setLikeActive(true);
      axios
        .post(`${process.env.REACT_APP_BACKEND}/api/v1/liked`, likes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Success',
            text: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          // handle error
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  let ingredient = `${recipe.ingredients}`;
  let split = ingredient.split('-');
  split.shift();

  // create comment
  const [comments, setComments] = useState({
    comment_text: '',
    recipe_id: `${id}`,
  });

  const handleChange = (e) => {
    setComments({
      ...comments,
      [e.target.name]: e.target.value,
    });
  };

  const token = localStorage.getItem('token');
  const handleSendComment = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/v1/comment`, comments, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Success',
          text: `${res.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`,
        });
      });
  };

  // get data comment by user id
  const [dataComment, setDataComments] = useState([]);
  useEffect(() => {
    dispatch(getComment(setDataComments, id));
  }, []);

  const [loading, setLoading] = useState(true);

  const handleEdit = (id) => {};

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
    <body className={style.body}>
      <div className="container-fluid">
        <div className="container">
          <Navbar />
          <div className="row text-center mt-4">
            <div className="col-lg-12" data-aos="zoom-in-left" data-aos-duration="1000">
              <h1 className={`fw-bold ${style.textLanding}`}>{recipe.name_recipe}</h1>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-12 text-center" data-aos="zoom-in-right" data-aos-duration="1000">
              <div className={style.wrapperImg}>
                <img src={recipe.image} className={`position-relative ${style.detailImg}`} alt="popular-img" />

                <div className={style.wrapperButton}>
                  {!saveActive ? (
                    <button className={style.buttonSave} onClick={handleSave}>
                      <i className="bi bi-bookmark"></i>
                    </button>
                  ) : (
                    <button className={style.buttonSaveActive} onClick={handleSave}>
                      <i className="bi bi-bookmark"></i>
                    </button>
                  )}

                  <button className={style.buttonLike} onClick={handleLike}>
                    <i className="bi bi-hand-thumbs-up"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-12" data-aos="zoom-in-left" data-aos-duration="1000">
              <h5 className="fw-bolder">Ingredients</h5>
              <ul type="stripe">
                {split.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-3" data-aos="zoom-in-right" data-aos-duration="1000">
              <h5 className="fw-bolder mb-4">Video Step</h5>

              <button type="button" className={style.buttonStepVideo} onClick={handleVideo}>
                <i class="bi bi-play"></i>
              </button>
            </div>
          </div>

          <div className="row text-center mb-5">
            <div className="col-lg-12" data-aos="zoom-in-right" data-aos-duration="1000">
              <div className="form-floating mb-3">
                <form onSubmit={handleSendComment}>
                  <input
                    className={`form-control ${style.formControl}`}
                    style={{ height: '200px', backgroundColor: '#efefef' }}
                    placeholder="Leave a comment here"
                    type="text"
                    name="comment_text"
                    value={comments.comment_text}
                    onChange={handleChange}
                  ></input>

                  <button type="submit" className={`mt-3 ${style.buttonSend}`}>
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12" data-aos="zoom-in-left" data-aos-duration="1000">
              <h5 className="fw-bolder mb-4">Comment</h5>
            </div>

            <div className="col-lg-6" data-aos="zoom-in-right" data-aos-duration="1000">
              {dataComment.length > 0 ? <CommentList dataComment={dataComment} /> : <p>Comment not found!</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update Comment
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <input className={`form-control ${style.formControl}`} placeholder="Leave a comment here" onChange={handleChange}></input>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default DetailRecipe;
