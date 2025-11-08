import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import CardPostagem from "../cardpostagem/CardPostagem";
import type Postagem from "../../../models/Postagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import SyncLoader from "react-spinners/SyncLoader";
import { buscar } from "../../../services/Service";

function ListaPostagens() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const buscarPostagens = useCallback(async () => {
    try {
      setIsLoading(true);
      await buscar("/postagens", setPostagens, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, handleLogout]);

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    buscarPostagens();
  }, [buscarPostagens]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#3B3024" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && postagens.length === 0 && (
            <span className="text-3xl text-center my-8 text-[#3B3024]">
              Nenhuma Postagem foi encontrada!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postagens.map((postagem) => (
              <CardPostagem key={postagem.id} postagem={postagem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaPostagens;
