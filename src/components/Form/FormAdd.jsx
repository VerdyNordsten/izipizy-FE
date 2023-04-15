import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import packageIcon from '../../assets/images/profile/icon-image.png';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../redux/action/recipeAction';

// aos
import AOS from 'aos';
import 'aos/dist/aos.css';

const Add = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const [insertProduct, setInsertProduct] = useState({
    name_recipe: '',
    description: '',
    ingredients: '',
    video: '',
    image: '',
  });

  const [previewImage, setPreviewImage] = useState();

  const handleUploadImage = (e) => {
    const fileUploaded = e.target.files[0];
    document.getElementById('addImage').innerHTML = fileUploaded.name_recipe;
    setPreviewImage([URL.createObjectURL(fileUploaded)]);
    setInsertProduct((prev) => {
      return { ...prev, image: fileUploaded };
    });
  };

  const handleUploadVideo = (e) => {
    const fileUploaded = e.target.files[0];
    document.getElementById('addVideo').innerHTML = fileUploaded.name_recipe;
    setInsertProduct((prev) => {
      return { ...prev, video: fileUploaded };
    });
  };
  // const handleChangeProducts = (event) => {
  //   const fileUploaded = event.target.files[0];
  //   document.getElementById('addVideo').innerHTML = fileUploaded.name_recipe;
  //   setVideoProduct(fileUploaded);
  // };

  const onSubmitInsertProduct = (e) => {
    e.preventDefault();
    dispatch(createRecipe(insertProduct));
  };

  return (
    <div className={style.customBody}>
      <main>
        <section>
          <div className="container mt-5">
            <form className="mx-5">
              <div className="mb-3" data-aos="zoom-in" data-aos-duration="1000">
                <div className={style.rectangle}>
                  <div>
                    <img width="150px" height="150px" src={previewImage ? previewImage : packageIcon} alt="" style={{ borderRadius: '15px' }} className={`${style.imageAdd} mt-2`} id="addImage" />
                  </div>
                  <input className={`${style.input} mt-3`} type="file" name="image" id="addImage" src={previewImage ? previewImage : packageIcon} onChange={handleUploadImage} />
                </div>
              </div>
              <div className="mb-3" data-aos="zoom-in" data-aos-duration="1000">
                <input
                  type="text"
                  className={`form-control ${style.input}`}
                  placeholder="Title"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setInsertProduct({
                      ...insertProduct,
                      name_recipe: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-3" data-aos="zoom-in" data-aos-duration="1000">
                <textarea
                  className={`form-control ${style.textArea}`}
                  placeholder="Ingredients"
                  type="text"
                  onChange={(e) => {
                    setInsertProduct({
                      ...insertProduct,
                      ingredients: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
              <div className="mb-3" data-aos="zoom-in" data-aos-duration="1000">
                <input className={`form-control ${style.input} mt-3`} type="file" name="video" id="addViddeo" src={previewImage ? previewImage : packageIcon} onChange={handleUploadVideo} />
                {/* <input
                  className={`form-control ${style.input}`}
                  placeholder="Video"
                  type="file"
                  onChange={(e) => {
                    setInsertProduct({
                      ...insertProduct,
                      video: e.target.value,
                    });
                  }}
                /> */}
              </div>
              <div className="mb-3" data-aos="zoom-in" data-aos-duration="1000">
                <textarea
                  className={`form-control ${style.textArea}`}
                  placeholder="description"
                  type="text"
                  onChange={(e) => {
                    setInsertProduct({
                      ...insertProduct,
                      description: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
              <div className="text-center">
                <button onClick={onSubmitInsertProduct} type="submit" className={`btn ${style.btnCustomArea}`}>
                  Post
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};
export default Add;
