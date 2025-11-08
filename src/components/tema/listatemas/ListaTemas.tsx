import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { AuthContext } from "../../../contexts/AuthContext";
import CardTema from "../cardtema/CardTema";
import type Tema from "../../../models/Tema";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { buscar } from "../../../services/Service";

function ListaTemas() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const buscarTemas = useCallback(async () => {
    try {
      setIsLoading(true);
      await buscar("/temas", setTemas, {
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
    buscarTemas();
  }, [buscarTemas]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#C47E32" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">

          {!isLoading && temas.length === 0 && (
            <span className="text-3xl text-center my-8 text-[#3B3024]">
              Nenhum Tema foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default ListaTemas;
