import config from "../../../config.json";
import { StyledHeader, StyledBanner } from "./Styles";

export default function Header() {
    
    /*return (
        <div>
            <div />
            <section className="user-info">
                <img src={`http://github.com/${config.gitbub}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </div>
    )*/

    return (
        <StyledHeader>
            <StyledBanner bg={config.bg}/>
            <section className="user-info">
                <img src={`http://github.com/${config.gitbub}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}