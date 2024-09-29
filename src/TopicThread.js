
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useEffect, useState } from 'react';

function TopicThread({ comments }) {
    const [topicComments, setTopicComments] = useState([]);

    const fetchComments = comments.map((comment,index) => {
        return (
            <div key={index}>
            <strong>{comment.title}</strong>
            <p>{comment.text}</p>
          </div>
        );
    });

    return (
        <div>
            {fetchComments}
        </div>
    );
}


export default TopicThread;