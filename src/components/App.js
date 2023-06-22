import "../components/style/main.scss"
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";

const App = () => {
  Icons();
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setLoggedInStatus("LOGGED_IN");
    }
    checkLoginStatus();
  }, []);

  const handleSuccessfulLogin = (authToken) => {
    localStorage.setItem('authToken', authToken);
    setLoggedInStatus("LOGGED_IN");
  };

  const handleUnsuccessfulLogin = () => {
    setLoggedInStatus("NOT_LOGGED_IN");
  };

  const handleSuccessfulLogout = () => {
    localStorage.removeItem('authToken');
    setLoggedInStatus("NOT_LOGGED_IN");
  };

  const checkLoginStatus = async () => {
    try {
      const response = await axios
        .get("https://api.devcamp.space/logged_in", { withCredentials: true });
      const loggedIn = response.data.logged_in;
      if (loggedIn) {
        setLoggedInStatus("LOGGED_IN");
      } else {
        setLoggedInStatus("NOT_LOGGED_IN");
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const authorizedPages = () => {
    return [
      <Route key="portfolio-manage" path="/portfolio-manager" element={<PortfolioManager />} />
    ];
  };

  return (
    <div className="container">
      <Router>
        <div>
          <NavigationContainer
            loggedInStatus={loggedInStatus}
            handleSuccessfulLogout={handleSuccessfulLogout}
          />

         

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/auth"
              element={
                <Auth
                  handleSuccessfulLogin={handleSuccessfulLogin}
                  handleUnsuccessfulLogin={handleUnsuccessfulLogin}
                />
              }
            />
            <Route path="/about-me" element={<About />} />
            <Route path="/contact" element={<Contact />} />
           
            <Route
              path="/blog" 
              element={
                <Blog
                  loggedInStatus={loggedInStatus}
                />
              }
            />
            
            <Route
              path="/b/:slug"
              element={
                <BlogDetail
                  loggedInStatus={loggedInStatus}
                />
              }
            />
    
            <Route exact path="/portfolio/:slug" element={<PortfolioDetail />} /> 
            {loggedInStatus === "LOGGED_IN" ? authorizedPages() : null}
            <Route path="/:slug" element={<NoMatch />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
