import React from "react";

interface UploadButtonProps {
    onClick: () => void
}

const UploadButton: React.FC<UploadButtonProps> = (props) => <div className={"text-center w-screen"}>
    <button onClick={props.onClick} className={"text-lg md:text-xl bg-gradient-to-r from-white to-gray-300 px-8 py-2 rounded shadow-xl active:shadow-none"}>{props.children}</button>
</div>

export default UploadButton;
