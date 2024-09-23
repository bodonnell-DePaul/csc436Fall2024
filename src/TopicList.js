import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import TopicThread from './TopicThread';
import React, { useEffect, useState } from 'react';
import topicsData from './dummyData.json';
import './TopicList.css';


function TopicList() {

    //iterate over all of our topic threads, injecting the contect into the accordian
    const [topics, setTopics] = useState([]);

    useEffect(() => {
      setTopics(topicsData);
    }, []);

  return (
    <Accordion defaultActiveKey="0">
      {topics.map((topic, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>{topic.title}</Accordion.Header>
          <Accordion.Body>
          {topic.content}
            <div className="accordion-footer">
              <strong>Rating:</strong> {topic.rating}
              <ButtonGroup className="ml-2">
                <Button variant="success">+</Button>
                <Button variant="danger">-</Button>
              </ButtonGroup>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );

  // return (
  //   <Accordion defaultActiveKey="0">
  //     <Accordion.Item eventKey="0">
  //       <Accordion.Header>Accordion Item #1</Accordion.Header>
  //       <Accordion.Body>
  //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  //         minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  //         aliquip ex ea commodo consequat. Duis aute irure dolor in
  //         reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  //         pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  //         culpa qui officia deserunt mollit anim id est laborum.
  //       </Accordion.Body>
  //     </Accordion.Item>
  //     <Accordion.Item eventKey="1">
  //       <Accordion.Header>Accordion Item #2</Accordion.Header>
  //       <Accordion.Body>
  //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  //         minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  //         aliquip ex ea commodo consequat. Duis aute irure dolor in
  //         reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  //         pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  //         culpa qui officia deserunt mollit anim id est laborum.
  //       </Accordion.Body>
  //     </Accordion.Item>
  //   </Accordion>
  // );
}

export default TopicList;