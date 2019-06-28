import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
export class ReviewForm extends Component {

    constructor(props){
        super(props);
        this.state = {
        restaurant: {reviews:[]},
            review:{
                customerName: "",
                reviewDescription: "",
                rating: 3
            },
        errors: {}
        }
    }

    change = (key, e) => {
        let r = {...this.state.review}
        r[key] = e.target.value
        this.setState({review: r})
    }

    review = (e) => {
        e.preventDefault();
        axios
          .post(`http://localhost:8000/api/reviews/${this.props.match.params._id}`, this.state.review)
          .then(res => {
            if(res.data.errors){
                this.setState({errors: res.data.errors.errors})
            } else {
                this.props.history.push(`/restaurants/${this.props.match.params._id}`)
            }
          })
          .catch(err => console.error(err));
    }

    componentDidMount = () => {
        // console.log(this.props.match.params._id)
        axios
          .get(`http://localhost:8000/api/restaurants/${this.props.match.params._id}`)
          .then(res => {
              this.setState({restaurant: res.data.restaurant})
          })
          .catch(err => console.error(err));
    }

    render() {
        return (
            <Container className="m-3">
                <div>
                    <h4>Write a review for {this.state.restaurant.restaurantName}</h4>
                    <hr/>
                        <Form onSubmit={this.review}>
                            <FormGroup>
                            <Label>Your Name:</Label>
                            <Input type="text" onChange={this.change.bind(this, "customerName")} placeholder="Please enter your name" />
                            {
                                this.state.errors.customerName ?
                                <p>{this.state.errors.customerName.message}</p>:
                                ""
                            }
                            </FormGroup>
                            <FormGroup>
                            <Label>Select</Label>
                            <select onChange={this.change.bind(this, "rating")}>
                                <option value="1">⭑</option>
                                <option value="2">⭑⭑</option>
                                <option value="3" selected>⭑⭑⭑</option>
                                <option value="4">⭑⭑⭑⭑</option>
                                <option value="5">⭑⭑⭑⭑⭑</option>
                            </select>
                            {
                                this.state.errors.rating ?
                                <p>{this.state.errors.rating.message}</p>:
                                ""
                            }
                            </FormGroup>
                            <FormGroup>
                            <Label>Your Review:</Label>
                            <Input type="text" onChange={this.change.bind(this, "reviewDescription")} placeholder="Please write a review" />
                            {
                                this.state.errors.reviewDescription ?
                                <p>{this.state.errors.reviewDescription.message}</p>:
                                ""
                            }
                            </FormGroup>
                            <Button color="primary" type="submit" className="primary">Submit</Button>
                        </Form>
                </div>
            </Container>
        )
    }
}

export default ReviewForm
