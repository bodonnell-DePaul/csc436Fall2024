import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function TopicThread({ comments, updateCommentRating }) {
    // Function to update the rating of a comment
    // Describes the updateRating function which calls updateCommentRating with the comment ID and the delta value.
    function updateRating(id,comment_id,current_rating, delta) {
        updateCommentRating(id,comment_id,current_rating, delta);
    };

    // Map through the comments array and create a list item for each comment
    //Indicates that the comments array is being mapped to create a list item for each comment.
    const matchedComments = comments.map((chat, index) => {
        return (
            <ListGroup as="ul" key={index}>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={chat.comment_id}>
                    <div className="ms-2 me-auto">
                        {/* Display the title of the comment 
                        Describes the div that displays the title of the comment.
                        */}
                        <div className="fw-bold">{chat.title}</div>
                        {/* Display the content of the comment */}
                        <p>{chat.content}</p>
                    </div>
                    <div className="accordion-footer-container">
                        {/* Display the rating of the comment and buttons to update the rating */}
                        <strong className="accordion-footer">Rating: {chat.rating}
                            <ButtonGroup size="sm">
                                {/* Button to increase the rating */}
                                <Button variant="success" onClick={() => updateRating(chat.id, chat.comment_id,chat.rating, 1)}>+</Button>
                                {/* Button to decrease the rating */}
                                <Button variant="danger" onClick={() => updateRating(chat.id, chat.comment_id,chat.rating, -1)}>-</Button>
                            </ButtonGroup>
                        </strong>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        );
    });

    return (
        <div>
            {/* Render the list of comments */}
            {matchedComments}
        </div>
    );
};

export default TopicThread;