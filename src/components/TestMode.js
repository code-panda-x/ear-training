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
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Input from '@material-ui/core/Input';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StopIcon from '@material-ui/icons/Stop';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Paper from '@material-ui/core/Paper';
// import pink from '@material-ui/core/colors/pink';
// import { Sampler } from 'tone';
// import {note, chord} from 'teoria';
import {instrument as soundfontInstrument} from 'soundfont-player';
import {OCTAVE_NUMBERS, TONES} from '../constants/NOTES';
import shuffleArray from '../util/shuffleArray';
import './PitchTrainer.css';

// Check boxes: The Selection Parameter

// A: Hard code this for each deck
function TonesCheckboxes(props){
  return(
    <React.Fragment>
      <FormLabel component="legend">
        Choose the notes to test, you can change anytime
      </FormLabel>
      <FormGroup row>
        {TONES.map((t) => 
          <FormControlLabel
            key={t}
            control={
              <Checkbox
                checked={props.tones[TONES.indexOf(t)]}
                onChange={props.handleSelection(t)}
                value={t}
              />
            }
            label={t}
          />
        )}
      </FormGroup>
    </React.Fragment>
  );
}

TonesCheckboxes.propTypes = {
  tones: PropTypes.array.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

function TonesAnswerButtons(props) {
  const answerButtons = props.answers.map((r) => 
    <Grid 
      key={r} 
      item xs={"auto"}>
      <Button 
        key={r} 
        color="default" 
        className="pitch-trainer-button" 
        onClick={() => props.handleGameAnswer(r)}> 
          {r} 
      </Button>
    </Grid>);
  return (
    <Grid
        container
        spacing={8}
        direction="row"
        alignItems="center"
        // justify="center"
        // style={{ minHeight: '70vh' }}
      >
      {answerButtons}
    </Grid>
  );
}

TonesAnswerButtons.propTypes = {
  answers: PropTypes.array.isRequired,
  handleGameAnswer: PropTypes.func.isRequired,
};

// return a table of statistics that user may be interested in
function PitchTrainerStatistics(props) {
  return(
    <Table className="pitch-trainer-stat-table">
        <TableHead>
          <TableRow>
            <TableCell>Notes Tested</TableCell>
            <TableCell numeric>Number of Questions</TableCell>
            <TableCell numeric>Number of Incorrect Attempts</TableCell>
            <TableCell numeric>Number of Correct Attempts</TableCell>
            <TableCell numeric>Average Times for Correct Attempt(s)</TableCell>
            <TableCell numeric>Accuracy (#Correct/#Attempts)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.note}
                </TableCell>
                <TableCell numeric>{row.numQ}</TableCell>
                <TableCell numeric>{row.numS}</TableCell>
                <TableCell numeric>{row.numA}</TableCell>
                <TableCell numeric>{isNaN(row.averageCorrectTime)?(0):(row.averageCorrectTime)}</TableCell>
                <TableCell numeric>{isNaN(row.accuracy)?(0):(row.accuracy)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
  );
}

// TODO
// Maybe using note from Teoria is better?
class TestMode extends Component {
  constructor(props) {
    super(props);

    // A: setting up all the variables to initial state?
    this.state = {
      //     ['C',  'C#', 'D', 'D#',  'E',  'F', 'F#', 'G', 'G#',  'A','A#',  'B']
      tones: [true,true,true,true,true,true,true,true,true,true,true,true],
      // tones: [true,true,true,false,false,false,false,false,false,false,false,false],
      isLoaded: false,
      isStarted: false,
      numChoices: 12,
      tonePlaying: 'C',
      notePlaying: 'C4',
      gameStartTime: 0,
      isCorrect: false,
      lastAnswer: -1, // -1: no ans, 0: wrong ans, 1: correct ans
      answers: [],
      // hasTimer: false,
      // statistics for last game if not first game
      isFirstGame: true,
      statQuestions: [0,0,0,0,0,0,0,0,0,0,0,0], // how many questions shown for a tone
      statSkips: [0,0,0,0,0,0,0,0,0,0,0,0], // how many skipped questions shown for a tone
      statTries: [0,0,0,0,0,0,0,0,0,0,0,0], // how many tries did user made for a tone
      statTriesTime: [0,0,0,0,0,0,0,0,0,0,0,0], // how long in total for user to decide a tone, used to calc average time
      statCorrect: [0,0,0,0,0,0,0,0,0,0,0,0], // how many correct ans in first selection, used to calc the accuracy
    };

    this.NUM_CHOICES_LIST = Array.apply(null, {length: TONES.length}).map(Number.call, Number).map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>).slice(3);
    this.ac = new AudioContext();
    soundfontInstrument(this.ac, 'acoustic_grand_piano', {
      soundfont: 'MusyngKite'
    }).then((acoustic_grand_piano) => {
      this.somePiano = acoustic_grand_piano;
      this.setState({ isLoaded: true });
    });
    
  }
  handleSelection = name => event => {
    let t = this.state.tones;
    t[TONES.indexOf(name)] = event.target.checked;
    this.setState({ tones: t });
  };
  handleGameStart() {
    const nextTone = this.getNextTone();
    const answers = this.getShuffledAnswers(this.state.tones,nextTone,this.state.numChoices);
    this.setState({
      gameStartTime: performance.now(),
      isStarted: true,
      tonePlaying: nextTone,
      notePlaying: this.getNextNote(nextTone),
      isCorrect: false,
      lastAnswer: -1,
      answers: answers,
    }, () => this.handlePlayNote());
  }
  handleGameStop() {
    const tonePlayingIdx = TONES.indexOf(this.state.tonePlaying);

    let statQuestions = this.state.statQuestions;
    statQuestions[tonePlayingIdx] += 1;

    let statSkips = this.state.statSkips;
    if(!this.state.isCorrect) statSkips[tonePlayingIdx] += 1;

    this.setState({
      isStarted: false,
      isCorrect: false,
      isFirstGame: false,
      lastAnswer: -1,
      gameStartTime: 0,
      statQuestions: statQuestions,
      statSkips: statSkips,
    });
  }
  handleNumChoices = event => {
    this.setState({
      [event.target.name]: event.target.value,
     });
  };
  // randomly chose a note from the tones user chooses
  getNextTone() {
    let tonesChosen = [];
    for(let i = 0; i < this.state.tones.length; ++i){ if(this.state.tones[i]) tonesChosen.push(TONES[i]); }
    return tonesChosen[Math.floor(Math.random()*tonesChosen.length)];
  }
  getNextNote(tone) {
    return tone+OCTAVE_NUMBERS[Math.floor(Math.random()*OCTAVE_NUMBERS.length)].toString();
  }
  // return an array of possible answers
  getShuffledAnswers(tones, tonePlaying, numChoices) {
    let answers = [tonePlaying], tonesChosen = [], numAns;
    for(let i = 0; i < tones.length; ++i){ if(tones[i] && TONES[i]!==tonePlaying) tonesChosen.push(TONES[i]); }
    numAns = Math.min(numChoices-1, tonesChosen.length);
    tonesChosen = shuffleArray(tonesChosen);
    while (numAns--) { answers.push(tonesChosen.pop()); }
    return shuffleArray(answers);
  }
  // return an array of objects representing rows of the stat table
  getStatRows() {
    let id = 0, rows = [], note;
    for(let noteIdx = 0; noteIdx < TONES.length; ++noteIdx) {
      if(this.state.statQuestions[noteIdx]) { // only process existing data
        note = TONES[noteIdx];
        id += 1;
        rows.push({
          id,
          note,
          numQ: this.state.statQuestions[noteIdx],
          numS: this.state.statSkips[noteIdx],
          numA: this.state.statCorrect[noteIdx],
          averageCorrectTime: (this.state.statTriesTime[noteIdx]/this.state.statCorrect[noteIdx]/1000).toFixed(4), // milliseconds
          accuracy: (this.state.statCorrect[noteIdx]/this.state.statTries[noteIdx]).toFixed(4),
        });
      }
    }
    return rows;
  }
  // Plays the note from the initialised piano
  handlePlayNote() {
    this.somePiano.play(this.state.notePlaying);
  }
  handleNext() {
    const tonePlayingIdx = TONES.indexOf(this.state.tonePlaying);

    let statQuestions = this.state.statQuestions;
    statQuestions[tonePlayingIdx] += 1;

    let statSkips = this.state.statSkips;
    if(!this.state.isCorrect) statSkips[tonePlayingIdx] += 1;

    let t = this.state.tones;
    let statCorrect = this.state.statCorrect;
    let numChoices = this.state.numChoices;
    for(var i = 0; i < statCorrect.length; i++)
        if (statCorrect[i] === 2) {
          t[i] = false;
        }
    if (t != this.state.tones)
      numChoices = numChoices - 1;
    this.setState({
      tones: t,
      numChoices: numChoices,
    });
    if (t.every(element => element === false)) {
      this.handleGameStop()
    }

    const nextTone = this.getNextTone();
    const answers = this.getShuffledAnswers(this.state.tones,nextTone,this.state.numChoices);
    this.setState({
      tonePlaying: nextTone,
      notePlaying: this.getNextNote(nextTone),
      answers: answers,
      gameStartTime: performance.now(),
      lastAnswer: -1,
      isCorrect: false,
      statQuestions: statQuestions,
      statSkips: statSkips,
    }, () => this.handlePlayNote());
  }
  handleGameAnswer(note) {
    const timeNow = performance.now(), tonePlayingIdx = TONES.indexOf(this.state.tonePlaying);
    const index = TONES.indexOf(note);
    
    if(!this.state.isCorrect) { // do nothing if already answered correctly
      if (this.state.lastAnswer!=0) {
        let statTries = this.state.statTries;
        statTries[tonePlayingIdx] += 1;
        if(note===this.state.tonePlaying) {
          let statTriesTime = this.state.statTriesTime;
          statTriesTime[tonePlayingIdx] += (timeNow - this.state.gameStartTime); // milliseconds
          let statCorrect = this.state.statCorrect;
          statCorrect[tonePlayingIdx] += 1;
          this.setState({
            isCorrect:true,
            lastAnswer:1,
            statTries: statTries,
            statTriesTime: statTriesTime,
            statCorrect: statCorrect,
          });
        } else {
          this.setState({
            statTries: statTries,
            lastAnswer:0,
          });
        }
      }
    } 
  }


  // This must be the entire grid like display?
  render() {
    return (
        <Grid
          container
          spacing={32}
          direction="column"
          alignItems="center"
          // justify="center"
          style={{ minHeight: '90vh', width:'100%', margin: 'auto'}}
        >

          {(!this.state.isStarted && !this.state.isFirstGame) ? 
          "" : (!this.state.isStarted) ?
          (<Grid container spacing={4} justify = "center" style = {{padding:"20px"}} >
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
                            Can you pass the test 🧐?
                            </Typography>
                        </CardContent>
                        <CardActions style={{justifyContent:'center', alignItems:'center', paddingBottom:"20px"}}>   
                            <Button disabled={!this.state.isLoaded} variant="contained" color="secondary" className="button pitch-trainer-button" onClick={() => this.handleGameStart()}>
                                <ArrowRightIcon className="leftIcon pitch-trainer-leftIcon" />
                                {this.state.isLoaded?"Start":"Loading"}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
          ) : (<div>
            <Grid item xs={"auto"}>
            <h1>Play the game</h1>
            <h2>{!this.state.isStarted ? "" : "Listen and select the note played" }</h2>
            </Grid>
            <Grid item xs={"auto"}>
              <Grid container spacing={16} direction="row" alignContent="center" >
                <Grid item xs={6} sm={6}>
                  <Button fullWidth={true} variant="contained" className="button pitch-trainer-button" onClick={() => this.handlePlayNote()}>
                    <MusicNoteIcon className="leftIcon pitch-trainer-leftIcon" />
                    Play
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Button fullWidth={true} variant="contained" className="button pitch-trainer-button" onClick={() => this.handleNext()}>
                    {(<SkipNextIcon className="leftIcon pitch-trainer-leftIcon" />)}
                    {("Next")}
                  </Button>
                </Grid>
              </Grid>
            </Grid></div>
          )}

          {(this.state.isStarted) && 
            <Grid item xs={"auto"}>
              <TonesAnswerButtons 
                answers={this.state.answers}
                handleGameAnswer = {
                  (note) => this.handleGameAnswer(note)
                }
              />
            </Grid>
          }

          {(this.state.isStarted) && 
            <Grid item>
              <Typography variant="h5">
              {(this.state.lastAnswer===-1) ? "Make a choice" : (this.state.lastAnswer===1) ? "Correct! The note is: "+this.state.notePlaying : "Wrong!"}
              </Typography>
            </Grid>
          }

          {(!this.state.isStarted && this.state.tones.every(element => element === false)) ? 
          "" : (!this.state.isStarted) ?  ("") : (
            <Grid item xs={"auto"}>
              <Button variant="contained" color="secondary" className="button pitch-trainer-button" onClick={() => this.handleGameStop()}>
              <StopIcon className="leftIcon pitch-trainer-leftIcon" />
              End
              </Button>
            </Grid>
          )}
          {(!this.state.isStarted) && (!this.state.isFirstGame) && 
            <Grid item xs={"auto"}>
              <h5>Statistics</h5>
              <PitchTrainerStatistics rows={this.getStatRows()}/>
            </Grid>
          }
        </Grid>
        
    );
  }
}

export default TestMode;