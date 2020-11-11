import * as React from 'react'
import * as ReactDOM from 'react-dom'

class App extends React.Component {
    render() {
        return (<MainMenu />)
    }
}

class MainMenu extends React.Component {
    MainMenuHeader() {
        return (
            <div id="main-menu-header" className="title-container">
                <img src="images/hammer_and_sickle.png" alt="USSR logo" className="title-logo" />
                <div id="game-title" className="title-box">
                    <h1 className="center russian">дурак</h1>
                    <h1 className="center russian-translation">( Durak )</h1>
                </div>
                <img src="images/hammer_and_sickle.png" alt="USSR logo" className="title-logo" />
            </div>
        )
    }

    MainMenuButtons() {
        return (
            <div id="game-menu">
                <div id="play-button" className="center menu-button">Start Game</div>
                <div id="second-button" className="center menu-button">TEST</div>
                <div id="third-button" className="center menu-button">TEST</div>
            </div>
        )
    }

    MainMenuFooter() {
        return (
            <div id="main-menu-footer" className="menu-footer">
                Created by: Kai, Panda, and Alex
            </div>
        )
    }

    render() {
        return (
            <div id="main-menu">
                <this.MainMenuHeader />
                <this.MainMenuButtons />
                <this.MainMenuFooter />
            </div>          
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))