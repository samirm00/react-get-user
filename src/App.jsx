import './App.css';

import Header from './components/Header';
import UserContainer from './components/UserContainer';

const App = () => {
    return (
        <div>
            <Header title="get user" />
            <UserContainer />
        </div>
    );
};

export default App;
