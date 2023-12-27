import React, { useState, useEffect } from 'react';
import data from './Components/random_posts_data.json';

const ForYouPage = () => {
  const [interests, setInterests] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedSort, setSelectedSort] = useState('none');

  // Fetch data and set initial posts
  useEffect(() => {
    setPosts(data);
  }, []);

  const handleInterestChange = (event) => {
    setInterests(event.target.value.split(','));
  };

  useEffect(() => {
    filterRecommendedPosts();
  }, [interests]);

  const filterRecommendedPosts = () => {
    const filteredPosts = data.filter((post) => {
      return interests.some((interest) => {
        return (
          post.title.toLowerCase().includes(interest.toLowerCase()) ||
          post.content.toLowerCase().includes(interest.toLowerCase()) ||
          post.category.toLowerCase() === interest.toLowerCase()
        );
      });
    });
    setPosts(filteredPosts);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  useEffect(() => {
    sortPosts();
  }, [selectedSort, posts]);

  const sortPosts = () => {
    setPosts((prevPosts) => {
      return [...prevPosts].sort((a, b) => {
        switch (selectedSort) {
          case 'views':
            return b.views - a.views;
          case 'comments':
            return b.comments.length - a.comments.length;
          case 'likes':
            return b.likes - a.likes;
          default:
            return 0;
        }
      });
    });
  };

  return (
    <div className="for-you-page">
      <h1>For You</h1>
      <form>
        <label htmlFor="interests">Enter your interests (comma-separated):</label>
        <input
          type="text"
          id="interests"
          value={interests.join(',')}
          onChange={handleInterestChange}
        />
      </form>
      <div className="sort-dropdown">
        <label htmlFor="sort-by">Sort By:</label>
        <select id="sort-by" onChange={handleSortChange}>
          <option value="none">None</option>
          <option value="views">Most Views</option>
          <option value="comments">Most Comments</option>
          <option value="likes">Most Likes</option>
        </select>
      </div>
      {posts.length > 0 ? (
        <ul className="recommended-posts">
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {/* Display other relevant information */}
              <span className="post-meta">
                {post.views} views | {post.comments.length} comments | {post.likes} likes
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Tell us your interests to see personalized recommendations.</p>
      )}
    </div>
  );
};

export default ForYouPage;
