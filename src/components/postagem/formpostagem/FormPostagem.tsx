import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Postagem from "../../../models/Postagem";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormPostagem() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([])
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', })
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>()

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout()
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout()
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout()
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
        if (id !== undefined) buscarPostagemPorId(id)
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (id !== undefined) {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Postagem atualizada com sucesso', 'sucesso')
            } else {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Postagem cadastrada com sucesso', 'sucesso');
            }
        } catch {
            ToastAlerta('Erro ao salvar a Postagem', 'erro')
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8 text-[#5a3a24]">
                {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4 bg-[#f2e3c6] p-6 rounded-xl shadow-md"
                  onSubmit={gerarNovaPostagem}>

                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo" className="text-[#5a3a24] font-semibold">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Título"
                        name="titulo"
                        required
                        className="border-2 border-[#8a5a36] bg-[#e9d7b0] rounded p-2"
                        value={postagem.titulo}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="texto" className="text-[#5a3a24] font-semibold">Texto da Postagem</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-[#8a5a36] bg-[#e9d7b0] rounded p-2"
                        value={postagem.texto}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-[#5a3a24] font-semibold">Tema da Postagem</p>
                    <select
                        name="tema"
                        id="tema"
                        className="border-2 border-[#8a5a36] bg-[#e9d7b0] rounded p-2"
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                    >
                        <option value="" disabled selected>Selecione um Tema</option>

                        {temas.map((tema) => (
                            <option key={tema.id} value={tema.id}>
                                {tema.descricao}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="rounded bg-[#c86f3f] hover:bg-[#8a5a36] 
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center
                               disabled:bg-gray-300"
                    disabled={carregandoTema}
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={24} />
                    ) : (
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormPostagem;
