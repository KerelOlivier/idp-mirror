import { read } from "fs"
import json5 from "json5"
import React,{Component} from "react"
import * as qs from "../questions.json"

type Answer = {
  value: string;
  weight: number;
};
type Question = {
  category: string;
  question: string;
  answers: Answer[];
}

type SurveyState = {
  questions: Question[]
  index: number;
};

class Survey extends Component<{},SurveyState>{
  componentWillMount(){
    this.setState({
      questions: qs.questions,
      index: 0
    })
  }

  //loads question(i)
  loadQuestion(i:number){
    this.setState({
      questions:this.state.questions,
      index: i      
    })
  }
  //Load next question
  nextQuestion = () => {
    const j = this.state.index + 1
    let i = j < this.state.questions.length ?  j : this.state.index
    this.loadQuestion(i)
  }
  //Load previous question
  prevQuestion = () => {
    const j = this.state.index - 1
    let i = j < this.state.questions.length ?  j : this.state.index
    this.loadQuestion(i)
  }

  render(){
    let q = this.state.questions[this.state.index]
    return(
      <div className="questionCard">
        <h2 key={q.question}>{q.question}</h2>
        {q.answers.map((o) => {return(
          <div><input type="radio" name="qoption" key={o.value}/><label>{o.value}</label></div>
        )})}
        <button className="prev" onClick={()=> this.setState({questions:this.state.questions, index:0})}>Previous</button>  
        <button className="next" onClick={this.nextQuestion}>Next</button>        
      </div>
    )
  }
}



export default Survey;
