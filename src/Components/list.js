import React from 'react'
import data from "./random_posts_data.json"

function List(props) {
    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return (el.title.toLowerCase().includes(props.input) || el.content.toLowerCase().includes(props.input) || el.author.toLowerCase().includes(props.input));
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <dl key={item.id}>
                    <dt><h4>{item.author}</h4></dt>
                    <dd>
                        <b>{item.title}</b>
                        <br />
                        -{item.content}
                    </dd>

                </dl>
            ))}
        </ul>
    )
}

export default List
