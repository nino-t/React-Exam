import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      exam_name: 'React Exam',      
      time: 1800,
      collection_of_questions: [
        {
          question: 'Bali is a part of the country?',
          option: [
            {
              option: 'Indonesia',
              selected: false
            },
            {
              option: 'United States of America',
              selected: false
            },
            {
              option: 'India',
              selected: false
            },
            {
              option: 'Others',
              selected: false
            }						
          ],
          answer_key: '',
          doubtful: false
        },
        {
          question: 'The capital of the country of japan?',
          option: [
            {
              option: 'London',
              selected: false
            },
            {
              option: 'Kyoto',
              selected: false
            },
            {
              option: 'Tokyo',
              selected: false
            },
            {
              option: 'Jakarta',
              selected: false
            }						
          ],
          answer_key: '',
          doubtful: false
        },
        {
          question: 'Who is the founder of facebook?',
          option: [
            {
              option: 'Bill Gates',
              selected: false
            },
            {
              option: 'Mark Zuckerberg',
              selected: false
            },
            {
              option: 'Dteve Aoki',
              selected: false
            },
            {
              option: 'Steve Jobs',
              selected: false
            }						
          ],
          answer_key: '',
          doubtful: false
        },				
      ],
      select_question_index: 0
    }
  }

  handleChangeOption(question_id, key_id){
    const questions = this.state.collection_of_questions;
    
		this.setUnchecked(questions, question_id);
    this.setChecked(questions, question_id, key_id);        
  }

	setUnchecked(selected, question_id){
		const option = selected[question_id].option;
	    option.map((data, i) => {
	    	selected[question_id].option[i].selected = false;

			this.setState({
				selected
			});		
	  });
	}

	setChecked(selected, question_id, key_id){
		const x = 'A';

		selected[question_id].option[key_id].selected = true;
		selected[question_id].answer_key = String.fromCharCode(x.charCodeAt(0) + key_id);

		this.setState({
			selected
		});
  }  
  
	changeQuestion(key_id){
		this.setState({
			select_question_index: key_id
		});
  }  
  
	tick() {
		this.setState((prevState) => ({
			time: prevState.time - 1
		}));	

    if (this.state.time <= 0) {
      this.finishHandler();
    }
	}	

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000);		
  }	  
  
	componentWillUnmount() {
		clearInterval(this.interval);
  }
  
	convertTime(time){
    var sec_num = parseInt(time, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }

	doubtfulChange(key_id){
		const selected = this.state.collection_of_questions;		
		if (selected[key_id].doubtful === true) {
			selected[key_id].doubtful = false;
		}else{
			selected[key_id].doubtful = true;
		}		

		this.setState({
			selected
		});		
	}  

  finishHandler(){
    alert('Thank you for taking the exam.');
  }

  render() {
    const x = 'A';
    const questions = this.state.collection_of_questions;
    const select_question_index = this.state.select_question_index;
    const selected_question = questions[select_question_index];
    var disable_prev = false;  
    var disable_next = false;

    if (select_question_index === 0) {
      disable_prev = true;
    }   

    if (select_question_index === (questions.length - 1)) {
      disable_next = true;
    }


    return (
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="col-md-12">
          <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-md-9">
                  <h3>React Exam</h3>
                </div>
                <div className="col-md-3">
                  <h3 className="pull-right">{ this.convertTime(this.state.time) }</h3>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
        </div>
        <div className="col-md-9">
          <div className="panel panel-primary">
            <div className="panel-heading">Question</div>
            <div className="panel-body">
              <div>
                <div>
                  <h4>{select_question_index + 1}. {selected_question.question}</h4>
                </div>                
                <br />
                <div>
                  <ul className="list-group">
                    {
                      selected_question.option.map((option, i) => (
                        <li className={"list-group-item "+ (option.selected ? 'active':'')}>
                          <input 
                            type="radio" 
                            id={"option-"+i} 
                            name={"question-"+select_question_index} 
                            style={{ display: 'none' }}
                            onChange={() => this.handleChangeOption(select_question_index, i)}
                             />
                          <label htmlFor={"option-"+i} style={{ display: 'block', cursor: 'pointer' }}>
                            {String.fromCharCode(x.charCodeAt(0) + i)}. {option.option}
                          </label>
                        </li>
                      ))
                    }                    
                  </ul>                  
                </div>
              </div>            
              <div className="col-md-4">
                <button 
                  className="btn btn-warning pull-left"
                  onClick={() => this.changeQuestion(select_question_index - 1)}
                  disabled={disable_prev}>
                    Prev
                </button>
              </div>
              <div className="col-md-4">
                <center>
                  <label className="btn btn-default col-md-12" htmlFor="ragu">
                    <input 
                      type="checkbox" 
                      id="ragu" 
                      checked={selected_question.doubtful}
                      onChange={() => this.doubtfulChange(select_question_index)} />
                    <p> Doubt</p>
                  </label>
                </center>
              </div>
              <div className="col-md-4">
                <button 
                  className={"btn btn-success pull-right " + (disable_next ? 'hidden' : '')}
                  onClick={() => this.changeQuestion(select_question_index + 1)}>
                  Next
                </button>

                <button 
                  className={"btn btn-success pull-right " + (disable_next ? '' : 'hidden')}
                  onClick={() => this.finishHandler()}>
                  Finish
                </button>                
              </div>              
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="panel panel-info">
              <div className="panel-heading">List of questions</div>
              <div className="panel-body">
                {
                  questions.map((question, i) => (                        
                  <button 
                    type="button"                     
                    className={"btn col-md-3 "+ (question.doubtful ? 'btn-warning':'btn-success')+(question.answer_key === '' ? 'btn-default':'')}
                    style={{margin: '3px 9px'}}
                    onClick={() => this.changeQuestion(i)}>
                    <center>
                      {i+1}.) {question.answer_key}
                    </center>                  
                  </button>  
                  ))
                }
              </div>
            </div>        
        </div>
      </div>
    );
  }
}

export default App;
