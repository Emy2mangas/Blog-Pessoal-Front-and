import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className='border border-[#3B3024] flex flex-col rounded-2xl overflow-hidden justify-between bg-[#F2E9D8]'>
            
            <header className='py-2 px-6 bg-[#C47E32] text-[#F2E9D8] font-bold text-2xl'>
                Tema
            </header>

            <p className='p-8 text-3xl bg-[#D9A066] text-[#3B3024] h-full'>
                {tema.descricao}
            </p>
            
            <div className="flex">
                <Link 
                    to={`/editartema/${tema.id}`}
                    className='w-full text-[#F2E9D8] bg-[#C47E32] hover:bg-[#3B3024]
                               flex items-center justify-center py-2 transition-colors'
                >
                    <button>Editar</button>
                </Link>

                <Link 
                    to={`/deletartema/${tema.id}`}
                    className='text-[#F2E9D8] bg-red-400 hover:bg-red-700 w-full 
                               flex items-center justify-center py-2'
                >
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardTema
