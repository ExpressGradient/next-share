import React, { useRef } from "react";

interface UploadButtonProps {
    fileHandler: (object) => void
}

const UploadButton: React.FC<UploadButtonProps> = (props) => {
    const inputRef = useRef(null);

    const onChangeHandler = () => {
        props.fileHandler(inputRef.current.files);
    }

    const onClickHandler = () => {
        inputRef.current.click();
    }

    return <div className={"text-center w-screen"}>
        <button className={"text-lg md:text-xl bg-gradient-to-r from-white to-gray-300 px-8 py-2 rounded shadow-xl active:shadow-none"} ref={inputRef} onClick={onClickHandler}>{props.children}</button>
        <input type="file" ref={inputRef} className={"hidden"} onChange={onChangeHandler} multiple={true}/>
    </div>
}

export default UploadButton;
