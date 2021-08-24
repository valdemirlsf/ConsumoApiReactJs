import React from 'react';
import M from 'materialize-css';
import { Link, withRouter } from 'react-router-dom';
import ContatosService from '../services/contatosService';

class Novo extends React.Component{
    constructor(props){
        super(props);
        this.contatosService = new ContatosService();
        this.state = {
            'nome': '',
            'telefone': '',
            'email': '',
            'dataNascimento': ''

        }
        this.modificar = this.modificar.bind(this)
    }
    modificar(event){
        let campo = event.target.name;
        this.setState({[campo]: event.target.value}) 
    }
    salvar(){
        if(this.state.id){
            this.contatosService.editar(this.state)
            .then(response => {
                M.toast({html: 'Edições salvas!', classes: 'corSucesso'});
                this.props.history.push("/");
            })
            .catch(error =>{
                M.toast({html: 'Não foi possível alterar o contato!', classes: 'corErro'});
            })
        }else{
            this.contatosService.salvar(this.state)
            .then( response => {
                M.toast({html: 'Contato Salvo!', classes: 'corSucesso'});
                this.props.history.push("/");
            })
            .catch(err => {
                M.toast({html: 'Não foi possível salvar!', classes: 'corErro'});
            })
        }
    }
    componentDidMount(){
        let id = this.props.match.params.id
            if(id){
            this.contato = this.contatosService.BuscaPorId(id)
            .then(response => {
                if(response.data){
                    this.setState(response.data)
                    let elementos = document.getElementsByTagName('label');
                    for(let elemento of elementos){
                        elemento.classList.add('active')
                    }
                }else{
                    M.toast({html: 'Não existe este contato', classes:'corErro'});
                }
            });
        }
        
        
    }
    render(){
        return(
            <div className="containter">
                <h4>Dados do contato</h4>
                <div className="row" id="form">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="first_name" type="text" name='nome' className="validate" value={this.state.nome} onChange={this.modificar}></input>
                                <label for="first_name">Nome</label>
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">phone</i>
                                <input id="icon_telephone" type="tel" name='telefone' className="validate" value={this.state.telefone} onChange={this.modificar}></input>
                                <label for="icon_telephone">Telephone</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix">email</i>
                                <input id="email" type="email" className="validate" name='email' value={this.state.email} onChange={this.modificar}></input>
                                <label for="email">Email</label>
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">date_range</i>
                                <input id="dat" type="date" name='dataNascimento' value={this.state.dataNascimento} onChange={this.modificar}></input>
                            </div>
                        </div>
                        <div className="row" id="botoes">
                            <a href="#" className="btn waves-effect waves-light botao" onClick={() => this.salvar()} type="submit" name="action">Salvar
                                <i className="material-icons right">send</i>
                            </a>
                            <a href="#" className="btn waves-effect waves-light red lighten-2 botao" href="/" type="submit" name="action">Cancelar
                                <i className="material-icons right">clear</i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            
        )
    }
}
export default withRouter(Novo);