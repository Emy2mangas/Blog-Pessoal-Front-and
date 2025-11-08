import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Tema deletado com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar o tema.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }
    
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4 text-[#3B3024]'>
                Deletar tema
            </h1>

            <p className='text-center font-semibold mb-4 text-[#3B3024]'>
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>

            <div className='border border-[#3B3024] flex flex-col rounded-2xl overflow-hidden justify-between bg-[#F2E9D8]'>

                <header className='py-2 px-6 bg-[#C47E32] text-[#F2E9D8] font-bold text-2xl'>
                    Tema
                </header>

                <p className='p-8 text-3xl bg-[#D9A066] text-[#3B3024] h-full'>
                    {tema.descricao}
                </p>

                <div className="flex">

                    <button 
                        className='text-[#F2E9D8] bg-red-500 hover:bg-red-700 w-full py-2'
                        onClick={retornar}
                    >
                        Não
                    </button>

                    <button 
                        className='w-full text-[#F2E9D8] bg-[#C47E32] hover:bg-[#3B3024] flex items-center justify-center py-2 transition-colors'
                        onClick={deletarTema}
                    >
                        { isLoading ? 
                            <ClipLoader color="#F2E9D8" size={24}/> 
                            : 
                            <span>Sim</span>
                        }
                    </button>

                </div>
            </div>
        </div>
    )
}

export default DeletarTema
