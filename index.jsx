import words from './out.json'
import React from 'react'
import ReactDOM from 'react-dom'
import soundpath from './temp.wav'

class Message extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unplayed: props.text.split(' '),
      played: [],
      source: props.src
    }
    
    this.index = 0
  }

  tick () {
    const cur = words[this.index]
    const time = this.state.source.currentTime
    if (time >= Number(cur.end)) {
      this.index += 1
      this.setState(state => {
        const word = state.unplayed.shift()
        state.played.push(word)

        return {
          unplayed: state.unplayed,
          played: state.played
        }
      })
    }
  }
  
  componentDidMount () {
    this.interval = setInterval(() => this.tick(), 10)
  }

  render () {
    return (
      <h1>
        <span style={{color: 'red'}}>{this.state.played.join(' ')} </span>
        {this.state.unplayed.join(' ')}
      </h1>
    )
  }
}

document.getElementById('btn').addEventListener('click', e => {
  const audio = new Audio(soundpath)
  ReactDOM.render(<Message text="this is a test. It's cool that this forced aligner works" src={audio} />, document.getElementById('content'))
  audio.play()
})
