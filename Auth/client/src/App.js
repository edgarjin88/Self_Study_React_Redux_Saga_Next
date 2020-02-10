import React from 'react';
import Layout from './core/Layout'

const App=() =>{
  return (
    <Layout>

      <div className="col-md-6 offset-md-3 text-centered">
        <h1 className="p-5">React Authentication Boiler plate</h1>
        <hr/>

        <p className="lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate possimus, a quo quasi aspernatur similique aliquid! Fugit alias dolorem officia et totam, repellendus perferendis aperiam aliquid mollitia accusantium ducimus facere.
        </p>
      </div>
      

    </Layout>
  )
}

export default App;


// ReactDOM.render(<App />, document.getElementById("root"));
// => ReactDOM.render(<Routes />, document.getElementById('root'));
// // Index > Routes > App > Layout