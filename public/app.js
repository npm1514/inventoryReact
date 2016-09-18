// -Main
//   -Home
//   -AddRemovePage
//     -AddRemoveForm
//   -InventoryPage
//     -InventoryList
//       -InventoryItem





ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="AddRemovePage" component={AddRemovePage}/>
      <Route path="InventoryPage" component={InventoryPage}/>
    </Route>
  </Router>
,
  document.getElementById('content')
);
