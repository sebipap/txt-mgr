import React from 'react'
import axios from 'axios'

export default class Terminal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dir: "/",
            log: [],
            query: "",
            task: "no"
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLog = this.handleLog.bind(this)
        this.printMsg = this.printMsg.bind(this)

    }

    componentDidMount(){

        let msg

        if(this.props.isLoggedIn){
            msg = (<> You're logged in as {this.props.user}.  </>)
        }else{
            msg = (<> You can <strong>login</strong> or <strong>register</strong> an account.</>)
        }


        this.setState({
            ...this.state,
            log:
            [
                <>
                    Welcome to <label className="dir">TxtMgr</label>  <br />
                    {msg}
                </>
            ]
        })
    }

    handleSubmit(e){

        e.preventDefault();
        this.handleLog();
        let clear = false

        const body = {
            query: this.state.query,
            user: this.state.user,
            dir: this.state.dir 
        }

        switch(this.state.query){
            case "":
                break

            case "clear":
                clear = true
                break

            case "logout":
                this.props.logOut()
                break
            
            default:
                axios.post('/cmd',body)
                .then( res => {
                    this.printMsg(res.data.msg)
                    switch (res.data.task) {
                        case "login":
                            this.props.logIn(res.data)
                            break;
                            
                    
                        default:
                            break;
                    }
                })
        }
        let newLog = clear ? [] : this.state.log   // if clear is activated it resets the log

        this.setState({
            ...this.state,
            query: "",
            log: newLog
        })
    }


    handleLog(){

        let prompt = (  
            <>                             
            <label className="user">{this.props.user}</label>
            <label className="dir">{this.state.dir}</label>
            {"$ " + " "}
            </>)

        let SubmitedLine = (<div>{prompt}{this.state.query} </div>)

        let newLog = this.state.log
        newLog.push(SubmitedLine)


        this.setState({
            ...this.state,
            log: newLog
        })
    }

    printMsg(msg){
        let newLog = this.state.log
        newLog.push(<> {msg}</>)

        console.log(msg)
        this.setState({
            ...this.state,
            log: newLog
        })
    }

    
    handleChange(event){

        this.setState({
            ...this.state,
            query: event.target.value,
        })
    }
    
    render(){

        let prompt = (  
            <>                             
            <label className="user">{this.props.user}</label>
            <label className="dir">{this.state.dir}</label>
            {"$ " + " "}
            </>)

        return(

            
            <div id="terminal" onClick={() => document.getElementById("cmdIn").focus()}>
                <div className="terminal-container">

                    <form onSubmit={this.handleSubmit}>

                        {this.state.log.map(line => line)}

                        <div className="terminal-input">
                            {prompt}
                            <input type="text" id="cmdIn" value={this.state.query} onChange={this.handleChange} autocomplete="off" />
                        </div>

                    </form>
                </div>
            </div>

        )
    }
}