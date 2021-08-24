import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/nav.css';
import M from 'materialize-css';
import ContatosService from '../services/contatosService';
import { Link } from 'react-router-dom';

class List extends React.Component{
    constructor(){
        super();
        this.contatosService = new ContatosService();
        this.state = {
            contatos: []
        }
        
    }
    async deletar(id){
        this.contatosService.deletar(id)
        .then(response =>{
            this.atualizarTabela();
            M.toast({html: 'Contato Excluído com Sucesso!', classes:'corSucesso'});
        })
    }

    atualizarTabela(){
        this.contatosService.BuscaContatos().then(response =>{
            this.setState({
                contatos: response.data
            })
        });
    }
    componentDidMount(){
        this.atualizarTabela();
    }

    render(){
        return (
            <div className='container'>
                <Link to="/cadastro" className="btn waves-effect waves-light botao" id="botaoAdd"><i className="material-icons">add</i>Adicionar contato</Link>
                <table >
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Opções</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.contatos.map(contato => (
                                <tr key={contato.id}>
                                    <td><i className="material-icons prefix" id="conta">account_circle</i></td>
                                    <td> <a href={`/info/${contato.id}`}>{contato.nome}</a></td>
                                    <td>{contato.telefone}</td>
                                    <td>{contato.email}</td>
                                    <td> 
                                        <a href={`/cadastro/${contato.id}`}>
                                            <i className="material-icons" id="lapis">edit</i>
                                        </a>
                                        <a href="#" onClick={() => this.deletar(contato.id)}>
                                            <i className="material-icons" id="lixeira">delete</i>
                                        </a>
                                        
                                    
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            
        )
    }

}

export default List;