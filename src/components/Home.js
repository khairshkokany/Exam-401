import React from 'react';
import axios from 'axios';
import { Card, Button, CardColumns } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flowerArr: [],
      postArr:[]
    }
  }

  componentDidMount = () => {

    const URL = 'http://localhost:3001/flowers';

    axios
      .get(URL)
      .then(results => {
        this.setState({
          flowerArr: results.data,
        })
      })
  }


  favFlower = (item) => {
   

    const URLS = 'http://localhost:3001/favflowers';
    const name = item.name;
    const photo = item.photo;
    const instructions = item.instructions;
    const {user} = this.props.auth0;

    const flowerData = {
      email : user.email,
      name : name,
      photo : photo,
      instructions : instructions
    }
    console.log('i am from post function ', flowerData);

    axios
    .post(URLS , flowerData )
    .then (element =>{
      try {
        this.setState({
          postArr : element.data
        })
      }catch (err) {
        console.log('this is the inside catch ');
      }
      console.log('from db' , this.state.postArr);
    }).catch((err) =>{
    console.log(err);
    })
  }



  render() {
    return (
      <>
        <h1>API Flowers</h1>
        <CardColumns>
{
  this.state.flowerArr.map(e =>{
    return (

          <Card style={{ width: '18rem' }}>
            <Card.Img name = 'photo' variant="top" src={e.photo} />
            <Card.Body>
              <Card.Title name = 'name'>{e.name}</Card.Title>
              <Card.Text name = 'instructions'>
               {e.instructions}
              </Card.Text>
              <Button variant="primary" type = 'submit' onClick ={() => this.favFlower(e)} >ADD FAV </Button>
            </Card.Body>
          </Card>
    )
  })

}
        </CardColumns>
      </>
    )
  }
}

export default withAuth0(Home);
