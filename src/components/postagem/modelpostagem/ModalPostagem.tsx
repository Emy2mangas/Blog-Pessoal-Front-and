import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FormPostagem from "../formpostagem/FormPostagem";

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button
            className="border border-[#3B3024] rounded px-4 py-2 
                       bg-[#D9A066] text-[#3B3024]
                       hover:bg-[#F2E9D8] hover:text-[#C47E32] transition-colors"
          >
            Nova Postagem
          </button>
        }
        modal
        contentStyle={{
          borderRadius: "1rem",
          paddingBottom: "2rem",
          background: "#F2E9D8",
          border: "2px solid #C47E32",
        }}
      >
        <FormPostagem />
      </Popup>
    </>
  );
}

export default ModalPostagem;
