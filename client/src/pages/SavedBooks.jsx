import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries'; // Update the path
import { REMOVE_BOOK } from '../utils/mutations'; // Update the path
import { Container, Col, Card, Row, Button, Spinner } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Use Apollo Client hook for the getMe query
  const { loading, error, data } = useQuery(GET_ME);

  // Use data from Apollo Client response to update state
  useEffect(() => {
    setUserData(data?.me || {});
  }, [data]);


  const handleRemoveBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removeBook({
        variables: { bookId },
      });
      // update userData with new data from mutation
      setUserData(data.removeBook);
      // remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <h2 className='py-4'>Viewing saved books!</h2>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      ) : error ? (
        <div>Error loading data</div>
      ) : userData.savedBooks.length > 0 ? (
        <Row>
          {userData.savedBooks.map((book) => (
            <Col md='4' key={book.bookId}>
              <Card border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      variant='danger'
                      className='btn-block btn-info'
                      onClick={() => handleRemoveBook(book.bookId)}
                    >
                      Remove Book
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <h3>You haven&apos;t added any books yet!</h3>
      )}
    </Container>
  );
};

export default SavedBooks;
