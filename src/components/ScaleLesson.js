import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
class ScaleLesson extends Component {
    nextPath(path) {
        this.props.history.push(path);
    }
    render(){
        return(
        <div>
            <Typography variant="h4" gutterBottom component="div">
                C MAJOR SCALE
            </Typography>

            <Typography variant="body1" gutterBottom>
                Major scales are the most important piano scales: firstly, because they are very common and, secondly, because they are fundamental to understanding keys. If you hear someone mention that a piano sonata by the composer and pianist Franz Schubert is played in A Major, it means that it depends on the A Scale.
                The key signature of C major scale has no sharp or flat. All notes in the C major scale are natural notes.
            </Typography>

            <Typography variant="overline" display="block" gutterBottom>
                Notes: C, D, E, F, G, A, B, C
                Fingering (LH): 5, 4, 3, 2, 1, 3, 2, 1
                Fingering (RH): 1, 2, 3, 1, 2, 3, 4, 5
            </Typography>

            <Typography variant="h6" gutterBottom component="div">
                Compositions:
            </Typography>

            <Typography variant="body1" gutterBottom>
                Twenty of Joseph Haydn's 104 symphonies are in C major, making it his second most-used key, second only to D major. Of the 134 symphonies mistakenly attributed to Haydn that H. C. Robbins Landon lists in his catalog, 33 are in C major, more than any other key. Before the invention of the valves, Haydn did not write trumpet and timpani parts in his symphonies, except those in C major. Landon writes that it wasn't "until 1774 that Haydn uses trumpets and timpani in a key other than C major... and then only sparingly." Most of Haydn's symphonies in C major are labelled "festive" and are of a primarily celebratory mood. Wilfrid Mellers believed that Mozart's Symphony No 41, written in 'white' C major, "represented the triumph of light". (See also List of symphonies in C major.)
                Many masses and settings of Te Deum in the Classical era were in C major. Mozart and Haydn wrote most of their masses in C major. Gounod (in a review of Sibelius' Third Symphony) said that "only God composes in C major". Six of his own masses are written in C.
                Of Franz Schubert's two symphonies in the key, the first is nicknamed the "Little C major" and the second the "Great C major".
                Scott Joplin's "The Entertainer" is written in the key of C major.
                Many musicians have pointed out that every musical key conjures up specific feelings. This idea is further explored in a radio program called The Signature Series. American popular songwriter Bob Dylan claimed the key of C major to "be the key of strength, but also the key of regret." Sibelius's Symphony No. 7 is in C major and that key was of great importance in his previous symphonies.
            </Typography>

            <Typography variant="h6" gutterBottom component="div">
                Notable examples:
            </Typography>

            <Typography variant="body1" gutterBottom>
                Johann Sebastian Bach:
                • Toccata, Adagio and Fugue in C major, BWV 564
                • Cello Suite No. 3, BWV 1009

                Ludwig van Beethoven
                • Piano Sonata No. 3, Op. 2, No. 3
                • Piano Concerto No. 1, Op. 15

                Wolfgang Amadeus Mozart
                • 12 Variations in C major on the French song "Ah, vous dirai-je, Maman", KV 265
                • Concerto for flute and harp, KV 299/297c
            </Typography>

            <Typography variant="h6" gutterBottom component="div">
                C Major Diatonic Chords:
            </Typography>

            <Typography variant="body1" gutterBottom>
                These are the seven major scale diatonic chords that come from the C major scale:
                I – C E G (C major chord).
                II – D F A (D minor chord).
                III – E G B (E minor chord).
                IV – F A C (F major chord).
                V – G B D (G major chord).
                VI – A C E (A minor chord).
                VII– B D F (B diminished chord).
            </Typography>
            <Button variant="contained" onClick={() => this.nextPath('/practicepitch') }>
                Begin Lesson
            </Button>
        </div>
        )
    }
}

export default ScaleLesson;


