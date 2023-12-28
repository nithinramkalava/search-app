import React, { useState } from 'react';
import data from './random_posts_data.json';

function List(props) {
  const [sortCriteria, setSortCriteria] = useState('none');

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  // create a new array by filtering the original array
  const filteredData = data.filter((el) => {
    // if no input, return the original
    if (props.input === '') {
      return el;
    }
    // return the item which contains the user input
    return (
      el.title.toLowerCase().includes(props.input) ||
      el.content.toLowerCase().includes(props.input) ||
      el.author.toLowerCase().includes(props.input)
    );
  });

  // sort the filtered data based on the selected criteria
  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortCriteria) {
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

  return (
    <div>
      <div>
        <label htmlFor="sort-by">Sort By:</label>
        <select id="sort-by" onChange={handleSortChange}>
          <option value="none">None</option>
          <option value="views">Most Views</option>
          <option value="comments">Most Comments</option>
          <option value="likes">Most Likes</option>
        </select>
      </div>
      <ul>
        {sortedData.map((item) => (
          <dl key={item.id}>
            <dt>
              <h4>{item.author}</h4>
            </dt>
            <dd>
              <b>{item.title}</b>
              <br />
              -{item.content}
            </dd>
          </dl>
        ))}
      </ul>
    </div>
  );
}

export default List;
    