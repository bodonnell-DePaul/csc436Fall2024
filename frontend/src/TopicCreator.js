import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

function TopicCreator({ addTopic }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ModalHeader = "Create a New Topic";

    function saveTopic(e) {
      e.preventDefault();
      console.log(e)
      console.log(e.target.formTitle.value)
      console.log(e.target.formContent.value);
      console.log(e.target.formSearchTag.value);
      
      const newTopic = {
          "id" : -1,
          "topic_id": -1,
          "title": e.target.formTitle.value,
          "content": e.target.formContent.value,
          "search_tag": e.target.formSearchTag.value,
          "rating": 0
      };
      addTopic(newTopic);
      handleClose();
    }

      // Function to execute when the Generate Tag button is clicked
  async function generateTag() {
      const formTitle = document.getElementById('formTitle').value;
      const formContent = document.getElementById('formContent').value;

      if (!formTitle || !formContent) {
        alert('Please fill out the Topic Subject and Topic Content fields before generating a tag.');
        return;
      }
      const commentForTags = {
        id: -1,
        comment_id: -1,
        topic_id: -1,
        title: formTitle,
        content: formContent,
        rating: 0,
        search_tag: ''
      };
      //const hostname = process.env.REACT_APP_dev_hostname;
      //const hostname ='https://poorman-reddit-backend-ejctamgefjf8aeaf.northcentralus-01.azurewebsites.net/';//
      const hostname = 'http://127.0.0.1:5070';
      try{
        const response = await fetch(hostname + '/generateSearchTag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(commentForTags)
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error posting topics:', error);
      }
      console.log('Generate Tag button clicked');
      // Add your logic here
    }

  return (
    <div className="Topic">
      <Button variant="primary" onClick={handleShow}>
        {ModalHeader}
      </Button>
      
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{ModalHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form id="TopicForm" onSubmit={saveTopic}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Topic Subject</Form.Label>
                <Form.Control type="text" name="formTitle"  placeholder="Topic Subject" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Topic Content</Form.Label>
                <Form.Control as="textarea" name="formContent"  rows={3} placeholder="Topic Description" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSearchTag">
                <Form.Label>Search Tag</Form.Label>
                <Form.Control type="text" id="formSearchBox"  placeholder="Enter a phrase that will be used for search" required />
                <Form.Label>Or Generate One</Form.Label><br></br>
                <Button variant="primary" type='button' onClick={generateTag} >
                    Generate Tag
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type='submit' form="TopicForm">
                Save Changes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      
    </div>
  );
}

export default TopicCreator;
