Main = React.createClass({
  render: function(){
    return (
      <div>
        <header>
          <h1>This is a Header for an Inventory App</h1>
          <Link to='/'>
						<button>Home</button>
					</Link>
					<Link to='AddRemovePage'>
						<button>Add/Remove</button>
					</Link>
          <Link to='InventoryPage'>
						<button>Current Inventory</button>
					</Link>
        </header>
        {this.props.children}
        <br/>
        <footer>
          This is a footer for an Inventory App
        </footer>
      </div>
    );
  }
});
