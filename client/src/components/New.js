import React, { Component } from "react"; 
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

class New extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
         newRestaurant: {
             restaurantName: "",
             crusine: ""
         }, 
         errors: {}
      }
  }

  change = (key, e) => {
      let r = {...this.state.newRestaurant}
      r[key] = e.target.value
      this.setState({newRestaurant: r})
  }

  makeRestaurant = (e) => {
      e.preventDefault();
      axios
        .post(`/api/restaurants`, this.state.newRestaurant)
        .then(res => {
            if(res.data.errors){
                this.setState({errors: res.data.errors.errors})
            } else {
                this.props.history.push("/restaurants")
            }
        })
        .catch(err => console.error(err));
  }

  render() {
    return (
        <Container>
            <Form className="m-3" onSubmit={this.makeRestaurant}>
                <h4>Register a restaurant</h4>
                <hr/>
            <FormGroup>
            <Label>Restaurant Name:</Label>
            <Input type="text" onChange={this.change.bind(this, "restaurantName")} placeholder="Please enter a restaurant name" />
            {
                this.state.errors.restaurantName ?
                <p>{this.state.errors.restaurantName.message}</p>:
                ""
            }
            </FormGroup>
            <FormGroup>
            <Label>Crusine</Label>
            <Input type="text" onChange={this.change.bind(this, "crusine")} placeholder="Please enter a crusine" />
            {
                this.state.errors.crusine ?
                <p>{this.state.errors.crusine.message}</p>:
                ""
            }
            </FormGroup>
            <Button color="primary" type="submit" className="primary">Register</Button>
        </Form>
      </Container>
    );
  }
}

export default New;