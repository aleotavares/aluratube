import React from "react";
import config from "../config.json";
import styled, { ThemeConsumer } from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videosService } from "../src/services/videosService";

function HomePage() {

    const service = videosService();
    const [valorFiltro,setValorFiltro] = React.useState("");
    const [playlists,setPlaylists] = React.useState({});

    React.useEffect(() => {

        service.getAllVideos().then((result) => {

            //forma imutavel
            const novasPlaylists = { ...playlists };
            result.data.forEach((video) => {

                //inicializa o array
                if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];

                //Insere registro
                novasPlaylists[video.playlist]?.push(video);
            });

            setPlaylists(novasPlaylists);
        })
        .catch((error) => {

        });
    },[]);//[] -> significa que não está sendo monitorado, uma variavel ou state pode ser usado para disparar novas chamadas
          // ausencia do [] faz virar um loop infinito

    // console.log(config.playlists);

    return (
        <div>
            {/* Prop Drilling */}
            <Menu valorFiltro={valorFiltro} setValorFiltro={setValorFiltro} />
            <Header />
            <Timeline searchValue={valorFiltro} playlists={playlists} />
        </div>
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
  
  background-color: ${({ theme }) => theme.backgroundLevel1};

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
    }
`;

const StyledBanner = styled.div`
    height: 230px;
    background-image: url(${({bg}) => bg});
    /*background-image: url("${config.bg}");*/
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg}/>
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

function Timeline({searchValue, ...props}) {

    //console.log("fnTimeline",props)
    const playlistNames = Object.keys(props.playlists);

    // Statement - for
    // Retorno por expressao - foreach,map
    // Usar map ao inves de foreach
    //console.log("plNames",playlistNames)
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                
                const videos = props.playlists[playlistName];
                
                //console.log("playlistName",playlistName);
                
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {

                                const videoNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();

                                return videoNormalized.includes(searchValueNormalized);
                            
                            }).map((video)=>{
                                
                                return(
                                <a key={video.url} href={video.url}>
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