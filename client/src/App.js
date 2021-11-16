import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";

function App() {
    const auth = useSelector((state) => state.auth);

    return (
        <BrowserRouter>
            <div className="App">
                {auth.error && <div className="errorAlert">{auth.error}</div>}
                <Header />
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props) => {
                            if (auth.token)
                                return (
                                    <Redirect
                                        to={{
                                            pathname: "/home",
                                            state: { from: props.location },
                                        }}
                                    />
                                );
                            else return <Login {...props} />;
                        }}
                    />
                    <Route
                        path="/register"
                        exact
                        render={(props) => {
                            if (auth.token)
                                return (
                                    <Redirect
                                        to={{
                                            pathname: "/home",
                                            state: { from: props.location },
                                        }}
                                    />
                                );
                            else return <Register {...props} />;
                        }}
                    />
                    <Route
                        exact
                        path="/home"
                        render={(props) => {
                            if (auth.token) return <Home {...props} />;
                            else
                                return (
                                    <Redirect
                                        to={{
                                            pathname: "/",
                                            state: { from: props.location },
                                        }}
                                    />
                                );
                        }}
                    />
                    <Route path="*" component={Page404} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
