import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState, useEffect } from 'react';
// const updateRating = (id, delta) => {
//     setTopics(comments.map(comment => 
//       comment.id === id ? { ...comment, rating: comment.rating + delta } : comment
//     ));
// };
function TopicThread({comments, updateCommentRating}){

    function updateRating(id,delta){
        updateCommentRating(id,delta);
    };

    useEffect(() => {
        console.log(comments)
    }, [comments]);

    const matchedComments = comments.map((chat, index) => {
        return(
            <ListGroup as="ul">
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={chat.id}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{chat.title}</div>
                        <p>{chat.content}</p>
                    </div>
                    <div className="accordion-footer-container">
                        <strong className="accordion-footer">Rating: {chat.rating} 
                        <ButtonGroup size="sm">
                            <Button variant="success" onClick={() => updateRating(chat.id, 1)}  >+</Button>
                            <Button variant="danger" onClick={() => updateRating(chat.id, -1)} >-</Button>
                        </ButtonGroup>
                        </strong>
                    </div>
                </ListGroup.Item>
            </ListGroup>

        );
    });

    return(
        <div>
            {matchedComments}
        </div>
    );

};

export default TopicThread;