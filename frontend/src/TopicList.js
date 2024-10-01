import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import TopicThread from './TopicThread';
// import topicData from './dummyData.json';
// import commentData from './commentData.json';
import './TopicList.css';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';
import TopicCreator from './TopicCreator';
import { Form, FormGroup } from 'react-bootstrap';


const hostname = 'http://127.0.0.1:5070'
const topicData = [];
const commentData = [];
function TopicList() {

  const [comments, setComments ] = useState(commentData)
  const [topics, setTopics ] = useState(topicData)
  const [expanded, setExpanded] = useState(null);
//Both of these work interchangably
  function anotherTopic(newTopic){
    setTopics([...topics, newTopic])
  };

  const addTopic = (newTopic) => {
    setTopics([...topics, newTopic]);
  };

  const updateComments = (e) => {
    e.preventDefault();
    console.log(e.target.replySubject.value)
    console.log(e.target.replyContent.value);
    const newComment = {
      "id": Date.now(),
      "title_id": expanded+1,
      "title": e.target.replySubject.value,
      "content": e.target.replyContent.value,
      "rating": 0
    };
    setComments([...comments, newComment]);
    
    e.target.replySubject.value = "";
    e.target.replyContent.value = "";
  };

  const updateTitleRating = (id, delta) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, rating: topic.rating + delta } : topic
    ));
  };

  const updateCommentRating = (id, delta) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, rating: comment.rating + delta } : comment
    ));
};



  useEffect(() => {

  }, [])
  useEffect(() => {
    fetch(hostname+'/getTopics')
    .then(response => response.json())
    .then(data => {
      setTopics(data)
    });
    console.log(topics)
  }, [topics]);

  useEffect(() => {
    console.log(comments)
  }, [comments]);

  const handleAccordionToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };



  return (
    <div>
    <TopicCreator addTopic={anotherTopic} /><br></br>
    <Accordion >
      {topics.map(
          (topic, index) => (
            <Accordion.Item eventKey={index.toString()} key={index} >
              <Accordion.Header onClick={() => handleAccordionToggle(index)}>
                {topic.title}
                <Badge bg="primary" pill>
                  {
                    comments.filter(comment => comment.title_id === topic.id).length
                  }
                </Badge>
              </Accordion.Header>
              <Accordion.Body>
                <div style={{ paddingBottom: '10px' }}>
                  {topic.content}
                </div>
                
              <TopicThread comments={commentData.filter(comment => comment.title_id === topic.id)} updateCommentRating={updateCommentRating}/>
              {expanded === index && (
                <div style={{ width: '100%' }}>
                  <Form onSubmit={updateComments}>
                    <FormGroup controlId="replySubject">
                      <Form.Control type="text" name="formTitle"  placeholder="Reply Title"  />
                    </FormGroup>
                    <Form.Group controlId="replyContent">
                      <Form.Control as="textarea" rows={3} className="reply-form" style={{ width: '100%' }}  placeholder="Reply Content" />
                    </Form.Group>
                    <Button size="md" type="submit">Reply</Button>
                  </Form>
                </div>
              )}
              </Accordion.Body>

              <div className="accordion-footer-container">
                <div style={{ marginTop: '10px' }}>
                  <strong className="accordion-footer">Rating: {topic.rating}</strong>
                  <ButtonGroup size="sm" style={{ marginLeft: '10px', marginBottom: '20px' }}>
                    <Button variant="success" onClick={() => updateTitleRating(topic.id, 1)}>+</Button>
                    <Button variant="danger" onClick={() => updateTitleRating(topic.id, -1)}>-</Button>
                  </ButtonGroup>
                </div>
              </div>
            </Accordion.Item>
          )
        )
      }
    </Accordion>
    </div>
  );
}

export default TopicList;