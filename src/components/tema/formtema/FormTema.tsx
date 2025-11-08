import { useContext, useEffect, useState, useCallback, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buscarPorId = useCallback(async (id: string) => {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }, [token, handleLogout]);

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (id) {
      buscarPorId(id);
    }
  }, [id, buscarPorId]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await atualizar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        ToastAlerta("O Tema foi atualizado com sucesso!", "sucesso");
      } else {
        await cadastrar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        ToastAlerta("O Tema foi cadastrado com sucesso!", "sucesso");
      }
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta(`Erro ao ${id ? "atualizar" : "cadastrar"} o tema.`, "erro");
      }
    } finally {
      setIsLoading(false);
      navigate("/temas");
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">

      <h1 className="text-4xl text-center my-8 text-[#3B3024]">
        {id ? "Editar Tema" : "Cadastrar Tema"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao" className="text-[#3B3024] font-semibold">
            Descrição do Tema
          </label>

          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name="descricao"
            className="border-2 border-[#3B3024] bg-[#F2E9D8] text-[#3B3024] rounded p-2 placeholder:text-[#3B3024]/60"
            value={tema.descricao}
            onChange={atualizarEstado}
          />
        </div>

        <button
          className="rounded text-[#F2E9D8] bg-[#C47E32] hover:bg-[#3B3024] w-1/2 py-2 mx-auto flex justify-center transition-colors"
          type="submit"
        >
          {isLoading ? (
            <ClipLoader color="#F2E9D8" size={24} />
          ) : (
            <span>{id ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormTema;
