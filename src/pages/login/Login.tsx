import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-[#f4e8d8]">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4" 
                    onSubmit={login}>

                    <h2 className="text-[#4a3b32] text-5xl ">Entrar</h2>

                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className="text-[#4a3b32]">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuário"
                            className="border-2 border-[#c9a27a] rounded p-2 bg-[#faf7f2] text-[#1f1b18]"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="senha" className="text-[#4a3b32]">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-[#c9a27a] rounded p-2 bg-[#faf7f2] text-[#1f1b18]"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <button 
                        type='submit' 
                        className="rounded bg-[#d98b4c] hover:bg-[#4a3b32] text-white w-1/2 py-2 flex justify-center">
                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-[#4a3b32]/40 w-full" />

                    <p className="text-[#4a3b32]">
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-[#d98b4c] hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>

                <div className="bg-[url('https://i.imgur.com/3HMybaH.png')] lg:block hidden bg-no-repeat 
                            w-full min-h-screen bg-cover bg-center"
                ></div>
            </div>
        </>
    );
}

export default Login;
