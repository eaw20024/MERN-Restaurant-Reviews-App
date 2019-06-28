import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Button, Container, Table } from 'reactstrap';


export class Review extends Component {

    constructor(props){
        super(props);
        this.state = {
            restaurant: {reviews:[]}
        }
    }

    componentDidMount = () => {
        // console.log(this.props.match.params._id)
        axios
          .get(`/api/restaurants/${this.props.match.params._id}`)
          .then(res => {
              this.setState({restaurant: res.data.restaurant})
          })
          .catch(err => console.error(err));
    }

    render() {
        return (
            <Container className="m-3">
                <h4 className="float-right">Reviews for {this.state.restaurant.restaurantName}</h4>
                <Button outline color="primary" className="mr-3">
                    <Link to={`/restaurants/${this.props.match.params._id}/review`}>New Review</Link>
                </Button>
                <Table dark className="mt-3">
                    <thead>
                        <th>Customer Name:</th>
                        <th>Stars:</th>
                        <th>Description:</th>
                    </thead>
                    <tbody>
                    {this.state.restaurant.reviews.map( review =>  {
                    return (
                        <tr key={review._id} className="review">
                            <td>{review.customerName}</td>
                            <td>{review.rating}</td>
                            <td>{review.reviewDescription}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </Table>  
            </Container>
        )
    }
}

export default Review
