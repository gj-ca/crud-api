import React from 'react'

class GetAll extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    fetch("https://ca-sample-api.herokuapp.com/things/")
      .then(response => response.json())
      .then(results => this.props.changeState(results))
      // .then(results => this.setState({data: results}))
  }

  render() {
    return (
      <>
      <h1>Get all records.</h1>
      <div>
        {this.props.data.map((record, index) => (
          <React.Fragment key={index}>
            <p><b>Id:</b> {record.id}</p>
            <p><b>Name:</b> {record.name}</p>
            <p><b>Description: </b>{record.description}</p>
            <hr/>
          </React.Fragment>
        ))}
      </div>
      <button onClick={this.handleClick}>Get All</button>
    </>
    )
  }
}

class NewRecord extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        name: "",
        description: "" 
      }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch("https://ca-sample-api.herokuapp.com/things/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description
      })
    })
    .then(response => {
      if (response.status == 200) {
        let data = this.props.data
        data.push({name: this.state.name, description: this.state.description})
        this.props.changeState(data)
      }
    })
    .catch(error => console.log(error.message))
  }

  changeName = (event) => {
    this.setState({name: event.target.value})
  }

  changeDescription = (event) => {
    this.setState({description: event.target.value})
  }

  render() {
    return (
      <>
        <h2>Add New Record</h2>
        <p>Errors go here if any</p>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input onChange={this.changeName} value={this.state.name}/>
          <label>Description:</label>
          <input onChange={this.changeDescription} value={this.state.description}/>
          <button>Post!</button>
        </form>
      </>
    )
  }
}

class DeleteRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: ""
    }
  }

  changeId = (event) => {
    this.setState({id: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`https://ca-sample-api.herokuapp.com/things/${this.state.id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.status == 200) {
          let data = this.props.data
          let index = data.findIndex(record =>  record.id == this.state.id)
          data.splice(index, 1)
          this.props.changeState(data)
        }})
      .catch(error => console.log(error))
  }

  render() {
    return (
      <>
        <h2>Delete Record</h2>
        <p>Errors go here if any</p>
        <form onSubmit={this.handleSubmit}>
          <label>id:</label>
          <input value={this.state.id} onChange={this.changeId} />
          <button>Delete!</button>
        </form>
      </>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  changeState = (newData) => {
    this.setState({data: newData})
  }

  render() {
    return (
      <>
        <GetAll data={this.state.data} changeState={this.changeState}/>
        <NewRecord data={this.state.data} changeState={this.changeState}/>
        <DeleteRecord data={this.state.data} changeState={this.changeState}/>
        <h2>Edit Record</h2>
        <p>Errors go here if any</p>
        <form>
          <label>id:</label>
          <input />
          <button>Edit!</button>
        </form>
      </>
    )
  }
}

export default App;
