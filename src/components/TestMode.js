import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Container
  } from "@material-ui/core";
import React, { Component } from 'react';
import './TestMode.css'
import {useNavigate} from 'react-router-dom';



class TestMode extends Component {
nextPath(path) {
    this.props.history.push(path);
}
  render() {
      return (
        <Grid container spacing={4} justify = "center" style = {{padding:"20px"}} >
            <Grid item xs={12} sm={6} md={4} style = {{padding:"20px"}}>
                <Card className={'card'}>
                    <CardMedia 
                        component={'img'}
                        className={'cardMedia'} 
                        image = { 
                            "https://improviseforreal.com/sites/default/files/wc_guy_banana_ear_960x540.jpg"    
                        }
                    />
                    <CardContent className={'cardContent'}>
                        <Typography
                        style={{ textAlign: "center" }}
                        variant="h6"
                        gutterBottom
                        >
                        Test your ear
                        </Typography>
                        <Typography style={{ textAlign: "center" }} variant="body2">
                        You will be hearing all 12 notes, and your task is try to identify all of them!
                        Each note will be played 3 times, if you identify the same note correctly 3 times, we will eliminate that note.
                        You might have multiple rounds, this test won't stop until you eliminate all the notes.
                        Can you pass the test in first round 🧐?
                        </Typography>
                    </CardContent>
                    <CardActions style={{justifyContent:'center', alignItems:'center', paddingBottom:"20px"}}>   
                        <Button variant="contained" onClick={() => this.nextPath('/testpitch') }>
                                Begin Test
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
      </Grid>
    )
  }
}


export default TestMode

