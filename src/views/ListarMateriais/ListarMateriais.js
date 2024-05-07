import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import ListarMateriaisTable from "../../components/Listar/ListarMateriaisTable/ListarMateriaisTable";


function ListarMateriais(){
    return (
        <div >
            <Navbar />
            <ListarMateriaisTable />
            <Sidebar />
        </div>
    )
}

export default ListarMateriais;