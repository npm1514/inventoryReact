InventoryList = React.createClass({
  render: function(){
    var self = this;
    if(typeof this.props.data == 'object'){
      var items = this.props.data.map(function(item){
        item.totalCurrentCost = Math.round(item.totalCurrentQuantity*item.costperUnit*100)/100;
        if(item.totalCurrentQuantity != 0) {
          return (
            <InventoryItem
              key={item._id}
              id={item._id}
              partNumber={item.partNumber}
              description={item.description}
              totalCurrentQuantity={item.totalCurrentQuantity}
              unitOfIssue={item.unitOfIssue}
              costperUnit={item.costperUnit}
              totalCurrentCost={item.totalCurrentCost}
              location={item.location}
              getItemsFromServer={self.props.getItemsFromServer}
            />
          );
        }
      });
    }
    return (
      <div>
        <table>
          <tr>
            <th>
              <td>Part Number</td>
              <td>Description</td>
              <td>Quantity</td>
              <td>Unit of Issue</td>
              <td>Unit Cost</td>
              <td>Total Value</td>
              <td>Location</td>
            </th>
          </tr>
          {items}
        </table>
      </div>
    );
  }
});

InventoryItem = React.createClass({
  submitChange: function(){
    var updatedPart = {
      _id: this.props.id,
      partNumber: this.state.PN,
      description: this.state.description,
      unitOfIssue: this.state.UI,
      costperUnit: this.state.CU,
      location: this.state.location
    };
    if(this.state.PN){
      updatedPart.partNumber = this.state.PN;
    } else {
      updatedPart.partNumber = this.props.partNumber;
    }
    if(this.state.description){
      updatedPart.description = this.state.description;
    } else {
      updatedPart.description = this.props.description;
    }
    if(this.state.UI){
      updatedPart.unitOfIssue = this.state.UI;
    } else {
      updatedPart.unitOfIssue = this.props.unitOfIssue;
    }
    if(this.state.CU){
      updatedPart.costperUnit = this.state.CU;
    } else {
      updatedPart.costperUnit = this.props.costperUnit;
    }
    if(this.state.location){
      updatedPart.location = this.state.location;
    } else {
      updatedPart.location = this.props.location;
    }
    $.ajax({
      method: "PUT",
      url: "/part/" + updatedPart._id,
      data: updatedPart,
      success: function(response) {
        console.log(response);
        this.setState({
          inventory:
            <tr onDoubleClick={this.updateEverything}>
              <td>{this.props.partNumber}</td>
              <td>{this.props.description}</td>
              <td>{this.props.totalCurrentQuantity}</td>
              <td>{this.props.unitOfIssue}</td>
              <td>{this.props.costperUnit}</td>
              <td>{this.props.totalCurrentCost}</td>
              <td>{this.props.location}</td>
            </tr>
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  changePN: function(e) {
    this.setState({PN: e.target.value});
  },
  changeDescription: function(e) {
    this.setState({description: e.target.value});
  },
  changeUI: function(e) {
    this.setState({UI: e.target.value});
  },
  changeCU: function(e) {
    this.setState({CU: e.target.value});
  },
  changeLocation: function(e) {
    this.setState({location: e.target.value});
  },
  updateEverything: function(){
    this.setState({
      inventory: <tr onDoubleClick={this.updateEverything}>
        <td>
          <input placeholder={this.props.partNumber} onChange={this.changePN}/>
        </td>
        <td>
          <input placeholder={this.props.description} onChange={this.changeDescription}/>
        </td>
        <td>{this.props.totalCurrentQuantity}</td>
        <td>
          <input placeholder={this.props.unitOfIssue} onChange={this.changeUI}/>
        </td>
        <td>
          <input placeholder={this.props.costperUnit} onChange={this.changeCU}/>
        </td>
        <td>{this.props.totalCurrentCost}</td>
        <td>
          <input placeholder={this.props.location} onChange={this.changeLocation}/>
        </td>
        <td>
          <button onClick={this.submitChange}>Update</button>
        </td>
      </tr>
    })
  },
  getInitialState: function(){
    return {
      inventory:
        <tr onDoubleClick={this.updateEverything}>
          <td>{this.props.partNumber}</td>
          <td>{this.props.description}</td>
          <td>{this.props.totalCurrentQuantity}</td>
          <td>{this.props.unitOfIssue}</td>
          <td>{this.props.costperUnit}</td>
          <td>{this.props.totalCurrentCost}</td>
          <td>{this.props.location}</td>
        </tr>,
      PN: "",
      Description: "",
      UI: "",
      CU: "",
      location: "",
      data: ""
    }
  },
  render: function(){
    return (
      <div>
        {this.state.inventory}
      </div>
    );
  }
});

InventoryPage = React.createClass({
  getItemsFromServer: function() {
    this.getInitialState();
    $.ajax({
      method: "GET",
      url: "/part",
      success: function(response) {
        console.log(response);
        this.setState({data: response});
        this.render();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: ''};
  },
  componentDidMount: function() {
    this.getItemsFromServer();
  },
  render: function(){
    return (
      <div>
        <InventoryList
          data={this.state.data}
          getItemsFromServer={this.getItemsFromServer}
        />
      </div>
    );
  }
});
