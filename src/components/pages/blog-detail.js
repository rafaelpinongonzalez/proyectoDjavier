import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import ReactHtmlParser from "react-html-parser";
import BlogFeaturedImage from "../blog/blog-featured-image";
import BlogForm from "../blog/blog-form";

const BlogDetail = (props) => {
  const { slug } = useParams();
  const [blogItem, setBlogItem] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleUpdateFormSubmission = (blog) => {
    setBlogItem(blog);
    setEditMode(false);
  };

  const handleEditClick = () => {
    if (props.loggedInStatus === "LOGGED_IN") {
    setEditMode(true);
    }
  };

  const handleFeaturedImageDelete = () => {
    setBlogItem((prevBlogItem) => ({
      ...prevBlogItem,
      featured_image_url: ""
    }));
  };

  useEffect(() => {
    const getBlogItem = async () => {
      try {
        const response = await axios.get(
          `https://javaco95.devcamp.space/portfolio/portfolio_blogs/${slug}`
        );
        setBlogItem(response.data.portfolio_blog);
      } catch (error) {
        console.log("getBlogItem error", error);
      }
    };

    getBlogItem();
  }, [slug]);

  if (!blogItem) {
    return <div>Loading...</div>;
  }

  const { title, content, featured_image_url, blog_status } = blogItem;

  const contentManager = () => {
    if (editMode) {
      return (
        <BlogForm
          handleFeaturedImageDelete={handleFeaturedImageDelete}
          handleUpdateFormSubmission={handleUpdateFormSubmission}
          editMode={editMode}
          blog={blogItem}
        />
      );
    } else {
      return (
        <div className="content-container">
          <h1 onClick={handleEditClick}>{title}</h1>

          <BlogFeaturedImage img={featured_image_url} />

          <div className="content">{(content)}</div>
        </div>
      );
    }
  };

  return <div className="blog-container">{contentManager()}</div>;
};

export default BlogDetail;
