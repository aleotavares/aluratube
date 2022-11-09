import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
//import Menu from "../src/components/Timeline";

function HomePage() {

    const estilosHP = { 
        //backgroundColor: "red"
    };

    console.log(config.playlists);

    return (
        <>
            <CSSReset/>
            <div style={estilosHP}>
                <Menu/>
                <Header />
                <Timeline playlists={config.playlists} />
            </div>
        </>
    )
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }

const StyledHeader = styled.div`
  img {
        width: 80p;
        height: 80px;
        border-radius: 50%
    }

    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
        margin-top: 50px;
    }
`;

function Header() {
    return (
        <StyledHeader>
            {/*<img src="banner"/>*/}
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

function Timeline(props) {

    console.log("fnTimeline",props)
    const playlistNames = Object.keys(props.playlists);
    // Statement - for
    // Retorno por expressao - foreach,map
    // Usar map ao inves de foreach
    console.log("plNames",playlistNames)
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                console.log("playlistName",playlistName);
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video)=>{
                                
                                return(
                                <a href={video.url}>
                                    <img src={video.thumb} />
                                    <span>
                                        {video.title}
                                    </span>
                                </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}