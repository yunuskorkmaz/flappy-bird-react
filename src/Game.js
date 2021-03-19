import { observer } from "mobx-react-lite";
import GameStore from "./store/GameStore";

import './game.css';

var state = new GameStore();

const Game = observer(() => {

    const jump = () => {
        if (!state.isGameOver) {
            state.jump();
        }
    };

    const stop = () => {
        state.stop();
    };

    const startGame = () => {
        state.startGame();
    };

    return (
        <>
            <div className="game-container" onClick={jump}>
                <div className="score">{state.score}</div>
                <div className="sky">
                    <div
                        className="bird"
                        style={{
                            left: state.birdLeft + "px",
                            bottom: state.birdBottom + "px"
                        }}
                    ></div>
                    {state.pillars.map((pillar) => {
                        return (
                            <>
                                <div
                                    key={pillar.id + "top"}
                                    style={{
                                        left: pillar.left + "px",
                                        bottom: pillar.topBottom + "px"
                                    }}
                                    className="pillar reverse"
                                ></div>
                                <div
                                    key={pillar.id + "bottom"}
                                    style={{
                                        left: pillar.left + "px",
                                        bottom: pillar.bottom + "px"
                                    }}
                                    className="pillar"
                                ></div>
                            </>
                        );
                    })}
                </div>
                <div className="ground"></div>
                {state.isGameOver && (
                    <div className="game-over">
                        Game Over
                        <div className="game-over-score">
                            <div>Score</div>
                            <div>
                                {state.score}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={() => startGame()}>start</button>
            <button onClick={stop}>stop</button>
        </>
    );
})

export default Game;