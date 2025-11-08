import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
	const navigate = useNavigate()

	const { usuario } = useContext(AuthContext)

	useEffect(() => {
		if (usuario.token === "") {
			ToastAlerta("Você precisa estar logado", 'info')
			navigate("/")
		}
	}, [usuario.token])

	return (
		<div className="flex justify-center mx-4 bg-[#f4e8d8] min-h-screen">
			<div className="container mx-auto my-4 rounded-2xl overflow-hidden bg-white shadow-xl">
				<img
					className="w-full h-72 object-cover border-b-8 border-[#c9a27a]"
					src="https://i.imgur.com/kV1a5AH.png"
					alt="Capa do Perfil"
				/>

				<img
					className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-[#c9a27a] relative z-10 bg-white"
					src={usuario.foto}
					alt={`Foto de perfil de ${usuario.nome}`}
				/>

				<div
					className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-[#4a3b32] text-[#faf7f2] text-2xl items-center justify-center"
				>
					<p>Nome: {usuario.nome} </p>
					<p>Email: {usuario.usuario}</p>
				</div>
			</div>
		</div>
	)
}

export default Perfil
