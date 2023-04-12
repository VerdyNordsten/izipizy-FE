import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './search.module.css';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar';

import { LineWave } from 'react-loader-spinner';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Search = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [searchRecipes, setSearchRecipes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const url = searchParams.get('search');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/recipe?search=${url}`).then((response) => {
      console.log(response.data.data);
      setSearchRecipes(response.data.data);
    });
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
      <Navbar />
      <div className="container">
        <div className="row">
          <h5 className={`mb-3 mt-4 ${style.searchText}`}>
            Search : <b>{`${url}`}</b>
          </h5>

          {searchRecipes?.map((item) => (
            <>
              <div className="col-lg-4 col-md-4 col-sm-6 mb-4 mt-3" data-aos="zoom-in-right" data-aos-duration="1000">
                <Link className={style.span} to={`/detailRecipe/${item.id}`}>
                  <div className={style.wrapperImgRecipe}>
                    <img src={item.image} className={style.imgRecipe} alt="img-recipe" />
                    <div className={style.wrapperTitle}>
                      <span className={style.productType}>{item.name_recipe}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
