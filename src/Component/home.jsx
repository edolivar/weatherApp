import { useEffect, useState } from "react";
import '../App.css'
import { withRouter } from 'react-router-dom';

function Home({ history }) {
    return (<div>Hello World</div>)
}

export default withRouter(Home)