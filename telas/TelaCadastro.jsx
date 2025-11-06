import { View, Text, Button } from 'react-native';
import axios from 'axios';
import InputPersonalizado from '../components/InputPersonalizado';
import { useState } from 'react';

function TelaCadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarsenha, setConfirmarSenha] = useState('');

    const [errors, setErrors] = useState([]);
    
    const efetuarCadastro = () => {
        let erros = [];
        
        if (senha !== confirmarsenha){
            erros.push(['As senhas não coincidem.']);
        }

        if (senha.length !==6) {
            erros.push(['A senha deve ter exatamente 6 caracteres.']);
        }

        if (nome.trim() ==='' || email.trim() ===''){
            erros.push(['Nome e email não podem estar vazios.']);
        }

        setErrors(erros);

        if(erros.length > 0) {
            return;
        }

        try {
            const resposta = axios.post("http://10.0.8.58:3000/api/usuarios",
                {
                    nome: nome,
                    email: email,
                    senha: senha
                }
            );
        } catch (error) {
            console.error('Erro ao cadastrar:' , error);
        }
    }


    return (
        <View>
            <Text>Tela de Cadastro</Text>

            {errors.length > 0 && (
                <View>
                    {errors.map((erro, index) => (
                        <Text key={index} style={{ color: 'red' }}>{erro}</Text>
                    ))}
                </View>
            )}

            <InputPersonalizado 
                legenda="Nome"
                textoTemporario="Digite seu nome"
                valor={nome}
                aoAlterarValor={setNome}
            />

            <InputPersonalizado 
                legenda="Email"
                textoTemporario="Digite seu email"
                valor={email}
                aoAlterarValor={setEmail}
            />

            <InputPersonalizado 
                legenda="Senha"
                textoTemporario="Digite sua senha"
                valor={senha}
                aoAlterarValor={setSenha}
                ehSenha={true}
            />

<InputPersonalizado 
                legenda="Confirmar senha"
                textoTemporario="Confirmar senha"
                valor={confirmarsenha}
                aoAlterarValor={setConfirmarSenha}
                ehSenha={true}
            />

            <Button 
                title="Cadastrar" 
                onPress={() => efetuarCadastro()} 
            />

            <Button 
                title="Cancelar" 
                onPress={() => navigation.navigate('Login')} 
            />
        </View>
    );
}

export default TelaCadastro;