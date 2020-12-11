import React from "react";
import { deleteFile, downloadFile } from "../firebase_config";

interface FileListProps {
    files: string[],
    folder: string,
    callback: () => void
}

const FilesList: React.FC<FileListProps> = (props) => {
    if(props.files.length == 0) {
        return <div className={"text-center my-2"}>
            <h1 className={"md:text-lg"}>Storage Empty</h1>
            <p>Please upload any files</p>
        </div>
    }

    const downloadFileHandler = (file: string) => {
        downloadFile(props.folder, file).then(url => window.open(url));
    }

    return <div className={"w-2/3 md:w-1/3 my-4 mx-auto bg-gradient-to-r from-blue-300 to-gray-100 p-4 rounded-md shadow-2xl max-h-80 overflow-y-auto"}>
        <h1 className={"text-center text-red-700 text-xl md:text-2xl"}>Storage</h1>
        <ul>
            {props.files.map(file => <li className={"flex justify-between my-2"} key={file}>
                <div className={"flex justify-start items-center cursor-pointer"} onClick={() => downloadFileHandler(file)}>   
                    <img src={"file-icon.png"} alt="Black File Icon" />
                    <p className={"text-gray-800"}>{file}</p>
                </div>
                <img src={"delete-file-icon.png"} alt="Black Delete File Icon" className={"cursor-pointer"} onClick={() => deleteFile(props.folder, file, props.callback)}/>
            </li>)}
        </ul>
    </div>
}

export default FilesList;
