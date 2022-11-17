import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./Styles";
import { backendService } from "../../../src/services/backendService";

//Custom Hook
function useForm(propsForm){
    
    const [values, setValues] = React.useState(propsForm.initialValues);
    
    return{
        values,
        handleChange: (e) => {
            
            const name = e.target.name;
            const value = e.target.value;

            setValues({
                ...values,
                [name]: value
            });
        },
        clearForm: () => {
            setValues({});
        }
    };
}

// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// Create a single supabase client for interacting with your database
const PROJECT_URL = 'https://hynjbhiedohvvghdrkwd.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bmpiaGllZG9odnZnaGRya3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MjkzMjgsImV4cCI6MTk4NDAwNTMyOH0.1dmzA0RlwcfJbh6EuHLpIyMcB6ynFZBF33An5FlbaLU';
const supabase = createClient(PROJECT_URL, API_KEY);

export default function RegisterVideo() {

    const service = backendService();
    const [formVisible, setFormVisible] = React.useState(false);
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "" }
    });

    React.useEffect(() => {

        service.getAllPlaylists()
            .then((result) => {

                result.data.forEach((playlist) => {
                    console.log(playlist.name);
                });
            })
            .catch((error) => {

            });

    },[]);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => { setFormVisible(true) }}>
                +
            </button>
            {/*
                Ternária - (condicao) ? true : false
                operadores curto circuito true && (valor)
            */}

            {formVisible ? (
                // Formik = component
                <form onSubmit={(e) => {
                    e.preventDefault();

                    supabase.from("videos").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos"
                    }).then((result) => {
                        
                        formCadastro.clearForm();
                        setFormVisible(false);
                    
                    }).catch((error) => {
                        //Tratamento de erros
                    });
                    
                }}>
                    <div>
                        <button
                            type="button"
                            className="close-modal"
                            onClick={() => setFormVisible(false)}>
                            x
                        </button>
                        
                        <input
                        name="titulo"
                            placeholder="Título do vídeo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange} />
                        
                        <input
                            name="url"
                            placeholder="URL do vídeo"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange} />
                        
                        <div>
                            Selecione uma playlist
                            <select
                                name="playlist"
                                defaultValue=""
                                placeholder="Playlist">
                                <option selected disabled value=""></option>
                                <option value="grapefruit">Grapefruit</option>
                                <option value="lime">Lime</option>
                                <option value="coconut">Coconut</option>
                                <option value="mango">Mango</option>
                            </select>
                        </div>

                        <button type="submit">Cadastrar</button>
                    </div>
                </form>

            )
                : false}

        </StyledRegisterVideo>
    );
}