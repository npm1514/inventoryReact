AddRemoveForm = React.createClass({
  handleAdd: function(e){
      e.preventDefault();
      if(this.state.pn2add && this.state.qty2add){
        for(var i = 0; i < this.props.data.length; i++){
          var partnumber2add = this.state.pn2add.toUpperCase();
          if(partnumber2add == this.props.data[i].partNumber) {
            var part2add = this.props.data[i];
          }
        }
      }
      part2add.totalCurrentQuantity = parseInt(part2add.totalCurrentQuantity) + parseInt(this.state.qty2add);
      this.props.onInventoryChange(part2add);
      this.setState({
        pn2add: '',
        qty2add: ''
      });
  },
  handleNewPart: function(e){
      e.preventDefault();
      if(this.state.newpn && this.state.newdescription && this.state.newui && this.state.newcu && this.state.newlocation){
        var newpart = {
          partNumber: this.state.newpn,
          description: this.state.newdescription,
          unitOfIssue: this.state.newui,
          costperUnit: this.state.newcu,
          location: this.state.newlocation,
          totalCurrentQuantity: 0,
          totalCurrentCost: 0

        };
        this.props.onPartAdd(newpart);
      }
      this.setState({
        partNumber: "",
        description: "",
        unitOfIssue: "",
        costperUnit: "",
        location: ""
      });
  },
  handleRemove: function(e){
    e.preventDefault();
    if(this.state.pn2remove && this.state.qty2remove){
      for(var i = 0; i < this.props.data.length; i++){
        var partnumber2remove = this.state.pn2remove.toUpperCase();
        if(partnumber2remove == this.props.data[i].partNumber) {
          var part2remove = this.props.data[i];
        }
      }
    }
    part2remove.totalCurrentQuantity = parseInt(part2remove.totalCurrentQuantity) - parseInt(this.state.qty2remove);
    this.props.onInventoryChange(part2remove);
    this.setState({
      pn2remove: '',
      qty2remove: ''
    });
  },
  handlePNToAddChange: function(e) {
    this.setState({pn2add: e.target.value});
  },
  handleQtyToAddChange: function(e) {
    this.setState({qty2add: e.target.value});
  },
  handlePNToRemoveChange: function(e) {
    this.setState({pn2remove: e.target.value});
  },
  handleQtyToRemoveChange: function(e) {
    this.setState({qty2remove: e.target.value});
  },
  handleNewPN: function(e) {
    this.setState({newpn: e.target.value});
  },
  handleNewDescription: function(e) {
    this.setState({newdescription: e.target.value});
  },
  handleNewUI: function(e) {
    this.setState({newui: e.target.value});
  },
  handleNewCU: function(e) {
    this.setState({newcu: e.target.value});
  },
  handleNewLocation: function(e) {
    this.setState({newlocation: e.target.value});
  },
  getInitialState: function(){
    return {
      pn2add: "",
      qty2add: "",
      pn2remove: "",
      qty2remove: "",
      newpn: "",
      newdescription: "",
      newui: "",
      newcu: "",
      newlocation: ""
    }
  },
  render: function(){
    return (
      <div>
        <div>
          <h2>Add parts to Inventory</h2>
          <form onSubmit={this.handleAdd}>
            <input
              type="text"
              placeholder="Part Number"
              onChange={this.handlePNToAddChange}
            />
            <input
              type="text"
              placeholder="Quantity"
              onChange={this.handleQtyToAddChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h2>Add New Part Number</h2>
          <form onSubmit={this.handleNewPart}>
            <input
              type="text"
              placeholder="Part Number"
              onChange={this.handleNewPN}
            />
            <input
              type="text"
              placeholder="Description"
              onChange={this.handleNewDescription}
            />
            <input
              type="text"
              placeholder="Unit of Issue"
              onChange={this.handleNewUI}
            />
            <input
              type="text"
              placeholder="Cost per Unit"
              onChange={this.handleNewCU}
            />
            <input
              type="text"
              placeholder="Location"
              onChange={this.handleNewLocation}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h2>Remove parts from Inventory</h2>
          <form onSubmit={this.handleRemove}>
            <input
              type="text"
              placeholder="Part Number"
              onChange={this.handlePNToRemoveChange}
            />
            <input
              type="text"
              placeholder="Quantity"
              onChange={this.handleQtyToRemoveChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>

      </div>
    );
  }
});

AddRemovePage = React.createClass({
  getItemsFromServer: function() {
    $.ajax({
      method: "GET",
      url: "/part",
      success: function(response) {
        console.log(response);
        this.setState({data: response});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  putItemsInServer: function(part) {
    $.ajax({
      method: "PUT",
      url: "/part/" + part._id,
      data: part,
      success: function(response) {
        console.log(response);
        this.getItemsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  postItemsToServer: function(part) {
    $.ajax({
      method: "POST",
      url: "/part",
      data: part,
      success: function(response) {
        console.log(response);
        this.getItemsFromServer();
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
        <h2>Fill in the form below to complete a new transaction.</h2>
        <AddRemoveForm
          data={this.state.data}
          onInventoryChange={this.putItemsInServer}
          onPartAdd={this.postItemsToServer}
        />
      </div>
    );
  }
});
