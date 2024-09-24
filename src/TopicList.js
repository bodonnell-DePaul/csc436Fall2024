import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import TopicThread from './TopicThread';
import topics from './dummyData.json';
import commentData from './commentData.json';
import './TopicList.css';

function TopicList() {
  return (
    <Accordion defaultActiveKey="0">
      {topics.map(
          (topic, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>{topic.title}</Accordion.Header>
              <Accordion.Body>
                {topic.content}
              <TopicThread comments={commentData.filter(comment => comment.title_id === topic.id)} />
              </Accordion.Body>
              <strong className="accordion-footer">Rating: {topic.rating} 
                <ButtonGroup size="sm">
                  <Button variant="success">+</Button>
                  <Button variant="danger">-</Button>
                </ButtonGroup>
              </strong>
            </Accordion.Item>
          )
        )
      }
    </Accordion>
  );
}

export default TopicList;