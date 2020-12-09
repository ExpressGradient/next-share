import React from "react";

interface ModalProps {
    title: string
    body: string
}

const Modal: React.FC<ModalProps> = (props) => {
    return <div className={"bg-gradient-to-r from-blue-200 to-gray-100 rounded-md w-2/3 py-6 md:w-1/3 fixed top-1/3 md:top-1/2 md:-translate-y-1/2 left-1/2 transform -translate-x-1/2 text-center"}>
        <h1 className={"text-2xl md:text-3xl"}>{props.title}</h1>
        <p className={"text-lg"}>{props.body}</p>
    </div>
}

export default Modal
