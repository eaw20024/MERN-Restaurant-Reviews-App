import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Table, Button } from 'reactstrap';

export class List extends Component {

    constructor(props){
        super(props);
        this.state = {
            restaurants: []
        }
    }

    componentDidMount = () => {
        axios
          .get("http://localhost:8000/api/restaurants")
          .then(res => {
            // console.log(res)
            this.setState({restaurants: res.data.restaurants});
          })
          .catch(err => console.error(err));
    }

    delete = (_id) => {
      // console.log(_id)
      axios
        .delete(`http://localhost:8000/api/restaurants/${_id}`)
        .then(res => {
          console.log(res)
          this.componentDidMount();
        })
        .catch(err => console.error(err));
    }

    render() {
      return (
        <Container>
        <>
        <Table dark className="mt-3">
            <thead>
                <th>Restaurant</th>
                <th>Crusine</th>
                <th>Actions Available</th>
            </thead>
            <tbody>
            {this.state.restaurants.map((restaurant) => {
              return (
                <tr key={restaurant._id} className="restaurant">
                    <td>{restaurant.restaurantName}</td>
                    <td>{restaurant.crusine}</td>
                    <td>
                    <Button outline color="secondary" className="m-1">
                      <Link to={`/restaurants/${restaurant._id}`}>Review</Link>
                    </Button>
                    <Button outline color="secondary" className="m-1">
                      <Link to={`/restaurants/${restaurant._id}/edit`}>Update</Link>
                    </Button>
                    <Button outline color="secondary" className="m-1">
                      <Link onClick={this.delete.bind(this,restaurant._id)}>Delete</Link>
                    </Button>
                    </td>
                </tr>
                )
            })}
          </tbody>
          </Table>
        </>
        </Container>
      )
    }
  }

export default List
