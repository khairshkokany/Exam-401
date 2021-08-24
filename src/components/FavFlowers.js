import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button, CardColumns } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class FavFlowers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      favArray : [],
      indexDel :0, 
      show : false,
      indexUpdate : 0
      
    }
  }


  componentDidMount = () => {

    const {user} = this.props.auth0;
    try {

      let URL = `http://localhost:3001/getfav?email=${user.email}`;


      axios
      .get(URL)
      .then(element => {
        // console.log(element.data);
        this.setState({
          favArray : element.data[0].flowerslist,
        })
        console.log(this.state.favArray);
      })
    } catch (err) {
      console.log(err);
    }
  }

  handleDelete = (index) =>{

    const {user} = this.props.auth0;
    let Data  = {
      email : user.email,
    }


    axios
    .delete(`http://localhost:3001/deletefav/${index}`,{params : Data})
    .then(data => {
      this.setState({
        favArray : data.data.flowerslist
      })
      console.log(this.state.favArray);
    }).catch((err) =>{
      console.log(err);
    })
    
  }


  handleUpdateShow = (i) => {
    this.setState({
      show:true ,
      indexUpdate : i,
      name : this.state.favArray[i].name,
      photo : this.state.favArray[i].photo,
      instructions :  this.state.favArray[i].instructions,

    })
  }


  render() {
    return(
      <>
        <h1>My Favorite Flowers</h1>
        <CardColumns>
{
  this.state.favArray.map((item, idx) =>{
    return (
      <div key = {idx}>

          <Card style={{ width: '18rem' }}>
            <Card.Img name = 'photo' variant="top" src={item.photo} />
            <Card.Body>
              <Card.Title name = 'name'>{item.name}</Card.Title>
              <Card.Text name = 'instructions'>
               {item.instructions}
              </Card.Text>
              {/* <Button variant="primary" type = 'submit' onClick ={() => this.favFlower(e)} >ADD FAV </Button> */}
              <Button variant="danger"  onClick ={() => this.handleDelete(idx)} >Delete </Button>
              <Button variant="primary" onClick ={() => this.handleUpdateShow(idx)}  >Update </Button>

            </Card.Body>
          </Card>
          </div>
    )
  })

}
        </CardColumns>

      </>
    )
  }
}

export default withAuth0(FavFlowers);
