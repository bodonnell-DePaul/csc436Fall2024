import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopicCreator from './TopicCreator';
import TopicList from './TopicList';
import App from './App';


function ViewPort() {
    return (
      <Container>
        <Row>
          <Col> <App/></Col>
        </Row>
      </Container>
    );
  }
  
  export default ViewPort;