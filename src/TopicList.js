import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import TopicThread from './TopicThread';
import topicData from './dummyData.json';
import commentData from './commentData.json';
import './TopicList.css';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';
import TopicCreator from './TopicCreator';
import { Form } from 'react-bootstrap';



function TopicList() {



  const addTopic = (newTopic) => {
    setTopics([...topics, newTopic]);
  };

  const updateComments = (e) => {
    e.preventDefault();
    console.log(e.target.formTitle.value)
    console.log(e.target.formContent.value);
    const newComment = {
      "id": Date.now(),
      "title_id": 1,
      "title": e.target.formTitle.value,
      "content": e.target.formContent.value,
      "rating": 0
    };
    setComments([...comments, newComment]);
  };

  const updateRating = (id, delta) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, rating: topic.rating + delta } : topic
    ));
  };

  const [comments, setComments ] = useState(commentData)
  const [topics, setTopics ] = useState(topicData)
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
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
    <TopicCreator addTopic={addTopic} /><br></br>
    <Accordion >
      {topics.map(
          (topic, index) => (
            <Accordion.Item eventKey={index.toString()} key={index} >
              <Accordion.Header onClick={() => handleAccordionToggle(index)}>{topic.title}
                <Badge bg="primary" pill>
                  {
                    comments.filter(comment => comment.title_id === topic.id).length
                  }
                </Badge>
              </Accordion.Header>
              <Accordion.Body>
                {topic.content}
              <TopicThread comments={commentData.filter(comment => comment.title_id === topic.id)} />
              {expanded === index && (
                <div style={{ width: '100%' }}>
                  <Form onSubmit={updateComments}>
                    <Form.Control as="textarea" rows={3} className="reply-form" style={{ width: '100%' }} onClick={(e) => e.stopPropagation()} />
                    <Button size="md" type="submit">Reply</Button>
                  </Form>
                </div>
              )}
              </Accordion.Body>

              <div className="accordion-footer-container">
                <div style={{ marginTop: '10px' }}>
                  <strong className="accordion-footer">Rating: {topic.rating}</strong>
                  <ButtonGroup size="sm" style={{ marginLeft: '10px', marginBottom: '20px' }}>
                    <Button variant="success" onClick={() => updateRating(topic.id, 1)}>+</Button>
                    <Button variant="danger" onClick={() => updateRating(topic.id, -1)}>-</Button>
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