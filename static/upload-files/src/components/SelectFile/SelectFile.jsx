import { useState } from "react"
import { uploadFile } from "../../logic/SelectFile.js"
import { UploadFile } from "../../icons/UploadFile.jsx"
import { PAGE_COLORS } from "../../constants.js"
import "./SelectFile.css"

function SelectFile({setFiles, apiHostName, setUploadStatus}){

    const [dragging, setDragging] = useState(false)
    const isDraggingClass = dragging ?  "fu-container fu-container-dragging" : null

    const makeFileUpload = (file) => {
        setUploadStatus("loading")
        uploadFile(file, apiHostName)
            .then((res) => res.json())
            .then((data) => {
                setFiles(data)
                setUploadStatus("uploaded")
            })
    }

    const handleSubmit = (e) => {
        const fileToUpload = e.target.files[0]

        if(fileToUpload){
            makeFileUpload(fileToUpload)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
        
        const fileToUpload = e.dataTransfer.files[0]

        if(fileToUpload){
            makeFileUpload(fileToUpload)
        }
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(true)
    }

    return(
        <div onDragOver={handleDrag} onDragLeave={() => {setDragging(false)}} onDrop={handleDrop} className={"fu-container " + isDraggingClass}>
            <UploadFile size="64" color={PAGE_COLORS[0]}></UploadFile>
            <span className="fu-text">
                {!dragging ? "Arrastrar y soltar archivo" : "Soltar archivo aqui!"}
            </span>
            <span className="fu-or"> o </span>
            <form className="fu-form">
                <label style={{textAlign:"center"}} className="fu-button" htmlFor="file">
                    Buscar
                </label>
                <input onChange={handleSubmit} type="file" id="file" className="fu-file-input"/>
            </form>
        </div>
    )
}

export {SelectFile}