import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from "react-router-dom";

/**
* @author
* @function ProductStore
**/

const ProductStore = (props) => {

  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const [priceRange, setPriceRange] = useState({
    under6K: 'Under 6000',
    under10K: 'Under 10000',
    under20K: 'Under 20000',
    under30K: 'Under 30000',
    under40K: 'Under 40000',
    above40K: 'Above 40000',
  });

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, [])



  return (
    <>
      {
        Object.keys(product.productsByPrice).map((key, index) => {
          return (
            <div className="card">
              <div className="cardHeader">
                <div>{props.match.params.slug} Mobile {priceRange[key]}</div>
                <button>View All</button>
              </div>
              <div style={{ display: 'flex' }}>
                {
                  product.productsByPrice[key].map(product =>
                    <Link
                      to={`/${product.slug}/${product._id}/p`}
                      style={{
                        display: "block",
                        textDecoration: "none",
                        color: "#000",
                      }}
                      className="productContainer"
                    >
                      <div className="productImgContainer">
                        <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                      </div>
                      <div className="productInfo">
                        <div style={{ margin: '5px 0' }}>{product.name}</div>
                        <div>
                          <span>4.3</span>&nbsp;
                                                <span>4465</span>
                        </div>
                        <div className="productPrice">{product.price}</div>
                      </div>
                    </Link>
                  )
                }
              </div>
            </div>
          );
        })
      }
    </>
  )
}


export default ProductStore