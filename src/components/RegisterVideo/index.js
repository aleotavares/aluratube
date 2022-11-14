import React from "react";
import { StyledRegisterVideo } from "./Styles";

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

export default function RegisterVideo() {

    const [formVisible, setFormVisible] = React.useState(false);
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "" }
    });

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
                    formCadastro.clearForm();
                    setFormVisible(false);
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
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>

            )
                : false}

        </StyledRegisterVideo>
    );
}