import React from 'react'
import { withRouter } from 'react-router-dom';
import ContatosService from '../services/contatosService';
import M from 'materialize-css';

class Detalhes extends React.Component{
    constructor(props){
        super(props);
        this.contatosService = new ContatosService();
        this.state = {
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id
        this.contato = this.contatosService.BuscaPorId(id)
        .then(response => {
            if(response.data){
                this.setState(response.data)
                console.log()
            }else{
                M.toast({html: 'Não existe este contato', classes:'corErro'});
            }
        });
    }
    render(){
        if(this.state.id===undefined){
            return(
                <div id="carregamento">
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                        </div>
                        </div>
                        <h4>Carregando...</h4>
                </div>
            )
        }else{
            let contato = this.state
            return(
                <div className="container">
                    
                    <div id="detalhes">
                    <i className="large material-icons prefix">account_circle</i>
                    <h4>{contato.nome}</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <i className="material-icons prefix">phone</i>
                                    </td>
                                    <td>
                                        {contato.telefone}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <i className="material-icons prefix">email</i>
                                    </td>
                                    <td>
                                        {contato.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <i className="material-icons prefix">date_range</i>
                                    </td>
                                    <td>
                                        {contato.dataNascimento}
                                    </td>
                                </tr>
                            </tbody>
                            
                        </table>
                        <a className='btn waves-effect waves-light botao' href={`/cadastro/${contato.id}`}>Editar</a>
                    </div>
                    
                </div>
                
    
            )
        }
        
    }
}
export default withRouter(Detalhes);