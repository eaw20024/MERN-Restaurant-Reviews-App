import React, { Component } from "react"; 
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
           restaurant: {
               restaurantName: "",
               crusine: ""
           }, 
           errors: {}
        }
    }

    componentDidMount = () => {
        // console.log(this.props.match.params._id);
        axios.get(`http://localhost:8000/api/restaurants/${this.props.match.params._id}`)
          .then( res => {
            this.setState({restaurant: res.data.restaurant});
          })
          .catch( err => {
            console.log(err);
          });
      }

    change = (key, e) => {
    let r = {...this.state.restaurant};
    r[key] = e.target.value;
    this.setState({restaurant: r});
    }

    updateRestaurant = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/restaurants/${this.state.restaurant._id}`, this.state.restaurant)
          .then( res => {
            if(res.data.errors){
              this.setState({errors: res.data.errors.errors})
            } else {
              this.props.history.push("/restaurants");
            }
          });
      }

    render() {
        return (
            <Container>
            <Form className="m-3" onSubmit={this.updateRestaurant}>
                <h4>Edit a restaurant</h4>
                <hr/>
            <FormGroup>
            <Label>Restaurant Name:</Label>
            <Input type="text" onChange={this.change.bind(this, "restaurantName")} value={this.state.restaurant.restaurantName} />
            {
                this.state.errors.restaurantName ?
                <p>{this.state.errors.restaurantName.message}</p>:
                ""
            }
            </FormGroup>
            <FormGroup>
            <Label>Crusine</Label>
            <Input type="text" onChange={this.change.bind(this, "crusine")} value={this.state.restaurant.crusine} />
            {
                this.state.errors.crusine ?
                <p>{this.state.errors.crusine.message}</p>:
                ""
            }
            </FormGroup>
            <Button color="primary" type="submit" className="primary">Edit</Button>
        </Form>
      </Container>
        )
    }
}

export default Edit
