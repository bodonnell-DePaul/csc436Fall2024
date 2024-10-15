import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import TopicThread from './TopicThread';
import './TopicList.css';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';
import TopicCreator from './TopicCreator';
import { Form, FormGroup } from 'react-bootstrap';

const hostname = 'http://127.0.0.1:5070'

function TopicList() {
  // State to store comments
  const [comments, setComments] = useState([]);
  // State to store topics
  const [topics, setTopics] = useState([]);
  // State to track which accordion item is expanded
  const [expanded, setExpanded] = useState(null);

  // Function to add a new topic
  function anotherTopic(newTopic) {
    postTopic(newTopic);
  }

  // Alternative function to add a new topic
  const addTopic = (newTopic) => {
    
    postTopic(newTopic);
  };

  async function postTopic(topic) {
    try {
      console.log('Posting topic:', topic);
      console.log('JSON: ', JSON.stringify(topic));
      const response = await fetch(hostname + '/addTopic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(topic)
      });
      const data = await response.json();
      setTopics([...topics, data]);
    } catch (error) {
      console.error('Error posting topics:', error);
    }
  };

  // Function to handle comment submission
  const newComments = (e) => {
    e.preventDefault();
    console.log(e.target.replySubject.value);
    console.log(e.target.replyContent.value);
    const newComment = {
      id: -1,
      comment_id: -1,
      topic_id: expanded,
      title: e.target.replySubject.value,
      content: e.target.replyContent.value,
      rating: 0
    };
    fetch(hostname + '/addComment',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)})
    .then(response => response.json())
    .then(data => {
      setComments([...comments, data]);
    });
    // Clear the form fields
    e.target.replySubject.value = "";
    e.target.replyContent.value = "";
  };

  // Function to update the rating of a topic
  const updateTitleRating = (id,topic_id, currentRating, delta) => {
    const updatedTopic = {
      "id" : id,
      "topic_id": topic_id,
      "title": '',
      "content": '',
      "rating": currentRating + delta
  };
    fetch(hostname + '/updateTopic',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTopic)})
    .then(response => response.json())
    .then(data => {
      setTopics(topics.map(data =>
        data.topic_id === topic_id ? { ...data, rating: data.rating + delta } : data
      ));
    });
    
  };

  // Function to update the rating of a comment
  const updateCommentRating = (id,comment_id,current_rating, delta) => {
    const updatedComment = {
      id: id,
      comment_id: comment_id,
      topic_id: -1,
      thread_id: -1,
      title: '',
      content: '',
      rating: current_rating+delta
    };
    fetch(hostname + '/updateComment',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedComment)})
    .then(response => response.json())
    .then(data => {
      setComments(comments.map(data =>
        data.comment_id === comment_id ? { ...data, rating: data.rating + delta } : data
      ));
      
    });


  };

  async function fetchComments() {
    try {
      const response = await fetch(hostname + '/getTopics');
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  // Fetch comments from the server when the component mounts
  useEffect(() => {

    //only execute the fetch if the comments array is empty
    //this example is used chaining the events together using .then()
    if (comments.length === 0) {
      fetch(hostname + '/getComments')
        .then(response => response.json())
        .then(data => {
          setComments(data);
        });
    }
    console.log(comments);
  }, [comments]);

  // Fetch topics from the server when the component mounts
  useEffect(() => {

    //only execute the fetch if the topics array is empty
    if (topics.length === 0) {
      //not using .then() here
      //instead creating an async function to perform the operations
      fetchComments();
    }
    console.log(topics);
  }, [topics]);

  // Function to handle accordion toggle
  const handleAccordionToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

    return (
    <div>
      {/* Component to create a new topic */}
      <TopicCreator addTopic={anotherTopic} /><br />
      
      {/* Accordion to display topics */}
      <Accordion>
        {topics.map((topic, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            {/* Accordion header with topic title and comment count */}
            <Accordion.Header onClick={() => handleAccordionToggle(topic.topic_id)}>
              {topic.title}
              <Badge bg="primary" pill>
                {/* Display the number of comments for the topic */}
                {comments.filter(comment => comment.topic_id === topic.topic_id).length}
              </Badge>
            </Accordion.Header>
            
            {/* Accordion body with topic content and comments */}
            <Accordion.Body>
              <div style={{ paddingBottom: '10px' }}>
                {/* Display the topic content */}
                {topic.content}
              </div>
              
              {/* Component to display comments for the topic
                The reason this was not displaying before is it was still set to the old array of comments called commentData
                Once I changed the comments to populate from the dotnet backend it became obvious
                Once I made the change to comments, then they started appearing under the apporopriate topics
                and the rating buttons began working as expected
              */}
              <TopicThread 
                comments={comments.filter(comment => comment.topic_id === topic.topic_id)} 
                updateCommentRating={updateCommentRating} 
              />
              
              {/* Form to add a new comment, displayed only if the accordion item is expanded */}
              {expanded === topic.topic_id && (
                <div style={{ width: '100%' }}>
                  <Form onSubmit={newComments}>
                    <FormGroup controlId="replySubject">
                      <Form.Control type="text" name="formTitle" placeholder="Reply Title" />
                    </FormGroup>
                    <Form.Group controlId="replyContent">
                      <Form.Control as="textarea" rows={3} className="reply-form" style={{ width: '100%' }} placeholder="Reply Content" />
                    </Form.Group>
                    <Button size="md" type="submit">Reply</Button>
                  </Form>
                </div>
              )}
            </Accordion.Body>
            
            {/* Footer with rating buttons */}
            <div className="accordion-footer-container">
              <div style={{ marginTop: '10px' }}>
                <strong className="accordion-footer">Rating: {topic.rating}</strong>
                <ButtonGroup size="sm" style={{ marginLeft: '10px', marginBottom: '20px' }}>
                  <Button variant="success" onClick={() => updateTitleRating(topic.id,topic.topic_id, topic.rating, 1)}>+</Button>
                  <Button variant="danger" onClick={() => updateTitleRating(topic.id, topic.topic_id, topic.rating,-1)}>-</Button>
                </ButtonGroup>
              </div>
            </div>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default TopicList;