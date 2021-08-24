import axios from 'axios';

export default class ContatosService{

    constructor(){
        this.urlApi = 'http://34.233.49.7/api/contatos/';
    }

    BuscaContatos(){
        return axios.get(this.urlApi);
    }

    BuscaPorId(id){
        return axios.get(this.urlApi+id);
    }

    editar(contato){
        return axios.put(this.urlApi+contato.id, contato)
    }
    deletar(id){
        return axios.delete(this.urlApi+id);
    }
    salvar(contato){
        return axios.post(this.urlApi, contato, {
            
        })
    }


}