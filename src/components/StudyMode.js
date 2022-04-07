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
import './StudyMode.css'
import {useNavigate} from 'react-router-dom';



class StudyMode extends Component {
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
                            "https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg"    
                        }
                    />
                    <CardContent className={'cardContent'}>
                        <Typography
                        style={{ textAlign: "center" }}
                        variant="h6"
                        gutterBottom
                        >
                        Key of C Major
                        </Typography>
                        <Typography style={{ textAlign: "center" }} variant="body2">
                        C major (or the key of C) is a major scale based on C, consisting of the pitches C, D, E, F, G, A, and B. 
                        C major is one of the most common keys used in music. 
                        Its key signature has no flats and no sharps. Its relative minor is A minor and its parallel minor is C minor.
                        </Typography>
                    </CardContent>
                    <CardActions style={{justifyContent:'center', alignItems:'center', paddingBottom:"20px"}}>   
                        <Button variant="contained" onClick={() => this.nextPath('/scalelesson') }>
                                Begin Lesson
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
      </Grid>
    )
  }
}


export default StudyMode

