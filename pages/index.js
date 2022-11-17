import React from "react";
//import config from "../config.json";
//import styled, { ThemeConsumer } from "styled-components";
import styled from "styled-components";
import Header from "../src/components/Header";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { backendService } from "../src/services/backendService";
//import { videosService } from "../src/services/videosService";
//import { playlistsService } from "../src/services/playlistsService";

function HomePage({theme,...props}) {

    console.log("homePage",theme)

    const service = backendService();
    const [valorFiltro,setValorFiltro] = React.useState("");
    const [playlists,setPlaylists] = React.useState({});

    React.useEffect(() => {

        service.getAllVideos()
            .then((result) => {

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

    return (
        <div>
            {/* Prop Drilling */}
            <Menu valorFiltro={valorFiltro} setValorFiltro={setValorFiltro} />
            {/*  */}
            <Header />
            <Timeline searchValue={valorFiltro} playlists={playlists} />
        </div>
    )
}

export default HomePage;

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