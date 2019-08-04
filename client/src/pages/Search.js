import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    books: [],
    search: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", description: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };


  saveBook = id => {
    API.saveBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };



  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();


    API.searchBooks(this.state.search)
    .then(res => {
          // store response in a array
          let results = res.data.items
          //map through the array 
          results = results.map(result => {
              //store each book information in a new object 
              result = {
                  key: result.id,
                  id: result.id,
                  title: result.volumeInfo.title,
                  author: result.volumeInfo.authors,
                  description: result.volumeInfo.description,
                  image: result.volumeInfo.imageLinks.thumbnail,
                  link: result.volumeInfo.infoLink
              }
              return result;
          })
          // reset the sate of the empty books array to the new arrays of objects with properties geting back from the response
          this.setState({ books: results, error: "" })
          this.setState({ search: results, error: "" })
      
  })
  .catch(err => this.setState({ error: err.items }));
}


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Book Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Search book by title"
              />

              <FormBtn
                // disabled={!(this.state.search)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Row>
          <Col size="md-12">

            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                      <strong>
                        {book.title} by {book.authors}
                      </strong>
                      <br></br>
                      <a href={book.link} target="_blank">
                        Get the Book Here!
                      </a>
                      <br></br>
                    <h4>Synopsis</h4>
                    <p>
                     <img src={book.image} alt="bookImg" /><br></br>
                      {book.description}
                    </p>

                    <Link to={"/saved/" + book._id}><SaveBtn onClick={() => this.saveBook(book._id)} />
                    </Link> 
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default Search;
