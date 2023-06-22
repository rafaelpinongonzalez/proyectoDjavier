import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PortfolioDetail = () => {
  const { slug } = useParams();
  const [portfolioItem, setPortfolioItem] = useState({});

  useEffect(() => {
    getPortfolioItem();
  }, []);

  const getPortfolioItem = () => {
    axios
      .get(`https://javaco95.devcamp.space/portfolio/portfolio_items/${slug}`, {
        withCredentials: true
      })
      .then(response => {
        setPortfolioItem(response.data.portfolio_item);
      })
      .catch(error => {
        console.log("getportfolioitem error", error);
      });
  };

  const { name, description, logo_url, url, banner_image_url } = portfolioItem;

  const bannerStyles = {
    backgroundImage: `url(${banner_image_url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center"
  };

  const logoStyles = {
    width: "200px"
  };

  return (
    <div className="portfolio-detail-wrapper">
      <div className="banner" style={bannerStyles}>
        <img src={logo_url} style={logoStyles} alt={name} />
      </div>
  
      <div className="portfolio-detail-description-wrapper">
        <div className="description">{description}</div>
      </div>
  
      <div className="bottom-content-wrapper">
        <a href={url} className="site-link" target="_blank" rel="noopener noreferrer">
          Visit {name}
        </a>
      </div>
    </div>
  ); 
};

export default PortfolioDetail;
