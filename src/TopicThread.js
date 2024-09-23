
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useEffect, useState } from 'react';

function TopicThread({ comments }) {
    const [topicComments, setTopicComments] = useState([]);

    const fetchComments = comments.map((comment,index) => {
        return (
            <div key={index}>
            <p>{comment.title}</p>
            {comment.comments && comment.comments.map((reply, replyIndex) => (
              <p key={replyIndex} style={{ marginLeft: '20px' }}>{reply}</p>
            ))}
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