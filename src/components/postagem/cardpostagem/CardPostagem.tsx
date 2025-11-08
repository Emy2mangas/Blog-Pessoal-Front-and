import { Link } from "react-router-dom";
import type Postagem from "../../../models/Postagem";

interface CardPostagemProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagemProps) {
  return (
    <div className="border-amber-900 border flex flex-col rounded-2xl overflow-hidden justify-between bg-amber-50">
      <div>
        <div className="flex w-full bg-amber-800 py-2 px-4 items-center gap-4 text-amber-50">
          <img
            src={postagem.usuario?.foto}
            className="h-12 rounded-full border-2 border-amber-900"
            alt="Imagem do Usuário"
          />
          <h3 className="text-lg font-bold text-center uppercase">
            {postagem.usuario?.nome}
          </h3>
        </div>

        <div className="p-4 text-amber-900">
          <h4 className="text-lg font-semibold uppercase">{postagem.titulo}</h4>
          <p>{postagem.texto}</p>
          <p>Tema: {postagem.tema?.descricao}</p>
          <p>Data: {new Date(postagem.data).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="w-full text-amber-50 bg-amber-700 hover:bg-amber-900 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="text-white bg-red-500 hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
