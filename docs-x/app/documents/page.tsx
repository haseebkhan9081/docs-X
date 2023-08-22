import getAllDocumentForCurrentUserById from "../actions/getAllDocumentForCurrentUserById";
import getCurrentUser from "../actions/getCurrentUser";
import NavBar from "./components/NavBar";
import NewDocument from "./components/NewDocument";
import Recent from "./components/Recent";

const Documents=async()=>{
    const currentUser=await getCurrentUser();
    const documents=await getAllDocumentForCurrentUserById(currentUser?.id);

    return <>
    <div
    className="
    flex
    flex-col
    ">
        <div
        className="
        flex
        flex-row
        ">
        <NavBar/>
        </div>
        <div
        className="
     
       recent
        w-full
        h-full
        ">
            <p
            className="
            text-gray-500
            p-2
            ">
start a new document
            </p>
        <div
        className="
        flex 
        flex-col
        p-3">
        <NewDocument/>
        <p
        className="
        px-3">Blank</p>
        </div>
        </div>

        <div
        className="
        w-full
        ">
     <Recent documents={documents!}  />
        </div>
        </div></>
}
export default Documents;