import React from "react";

const FilesList: React.FC = () => {
    const files = [];

    if(files.length == 0) {
        return <div className={"text-center my-2"}>
            <h1 className={"md:text-lg"}>Storage Empty</h1>
            <p>Please upload any files</p>
        </div>
    }
}

export default FilesList;
