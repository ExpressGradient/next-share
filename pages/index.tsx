import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Head from "next/head";
import UploadButton from "../components/UploadButton";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getClientIp } from "request-ip";
import {getFiles, uploadFile} from "./firebase_config";
import FilesList from "../components/FilesList";
import Modal from "../components/Modal";

const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const [modalState, setModalState] = useState(false);
    const [modalMessage, setModalMessage] = useState({title: "", body: ""});
    const [uploadFiles, setUploadFiles] = useState([]);

    const fileHandler = (files) => {
        setUploadFiles([]);
        for(let i=0; i < files.length; i++) {
            uploadFile(props.clientIp, files[i], (snapshot) => {
                setUploadFiles((state) => state.concat(snapshot._delegate.metadata.name));
            });
        }
        setModalMessage({title: `${uploadFiles.length} Files Uploaded`, body: uploadFiles.toString()});
        if(uploadFiles.length === files.length) {
            setModalState(true);
        }
        removeModal();
    }

    const removeModal = () => setTimeout(() => setModalState(false), 1500);

    useEffect(() => {
        getFiles(props.clientIp).then(response => response.items.forEach(item => console.log(item["_delegate"]._location.path.split("/")[1])));
    }, []);

    return <main className={"bg-gradient-to-r from-purple-700 to-blue-300 bg-cover h-screen"}>
        <Head>
            <title>Next-Share</title>
            <meta name={"description"} content={"Cloud-Local Network File Sharing"}/>
            <meta name={"author"} content={"Express Gradient"}/>
        </Head>

        <Header title={"Next-Share"} subTitle={"Cloud-Local Network File Sharing"}/>
        <h1 className={"text-center text-red-800 text-2xl md:text-3xl my-4"}>Room <br/>{props.clientIp}</h1>
        <UploadButton fileHandler={fileHandler}>Upload Files</UploadButton>
        <FilesList />
        {modalState && <Modal title={modalMessage.title} body={modalMessage.body} />}
    </main>
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const clientIp: string = getClientIp(context.req);

    return {
        props: {
            clientIp
        }
    }
}
