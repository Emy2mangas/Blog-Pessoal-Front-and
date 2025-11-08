import { useEffect, useState, useCallback, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  const retornar = useCallback(() => navigate("/"), [navigate]);

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario, retornar]);

  const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmarSenha = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmarSenha(e.target.value);
  };

  const cadastrarNovoUsuario = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);
      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro");
      } finally {
        setIsLoading(false);
      }
    } else {
      ToastAlerta(
        "Dados do usuário inconsistentes! Verifique as informações do cadastro.",
        "erro"
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-[#f4e8d8]">
      <div
        className="bg-[url('https://i.imgur.com/Pc7N3xK.png')] lg:block hidden bg-no-repeat 
                   w-full min-h-screen bg-cover bg-center"
      ></div>

      <form
        className="flex justify-center items-center flex-col w-2/3 gap-3"
        onSubmit={cadastrarNovoUsuario}
      >
        <h2 className="text-[#4a3b32] text-5xl">Cadastrar</h2>

        <div className="flex flex-col w-full">
          <label htmlFor="nome" className="text-[#4a3b32]">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className="border-2 border-[#c9a27a] rounded p-2 bg-[#faf7f2] text-[#1f1b18]"
            value={usuario.nome}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="usuario" className="text-[#4a3b32]">Usuario</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            className="border-2 border-[#c9a27a] rounded p-2 bg-[#faf7f2] text-[#1f1b18]"
            value={usuario.usuario}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="foto" className="text-[#4a3b32]">Foto</label>
          <input
            type="text"
            id="foto"
            name="foto"
            placeholder="Foto"
            className="border-2 border-[#c9a27a] rounded p-2 bg-[#faf7f2] text-[#1f1b18]"
            value={usuario.foto}
            onChange={atualizarEstado}
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
            value={usuario.senha}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha" className="text-[#4a3b32]">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            className="border-2 border-[#c9a27a] rounded p-2 bg-[#faf7f2] text-[#1f1b18]"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
          />
        </div>

        <div className="flex justify-around w-full gap-8">
          <button
            type="reset"
            className="rounded text-white bg-[#d98b4c] hover:bg-[#4a3b32] w-1/2 py-2"
            onClick={retornar}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="rounded text-white bg-[#d98b4c] hover:bg-[#4a3b32] w-1/2 py-2 flex justify-center"
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Cadastrar</span>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
