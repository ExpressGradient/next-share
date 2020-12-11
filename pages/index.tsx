import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import Head from "next/head";
import UploadButton from "../components/UploadButton";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getClientIp } from "request-ip";
import {getFiles, uploadFile} from "../firebase_config";
import FilesList from "../components/FilesList";
import Modal from "../components/Modal";

const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({title: "", body: ""});
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [inputFiles, setInputFiles] = useState([]);
    const [cloudFiles, setCloudFiles] = useState([]);

    const fileHandler = (files) => {
        setInputFiles(files);
        setUploadedFiles([]);

        for(let i=0; i < files.length; i++) {
            uploadFile(props.clientIp, files[i], (snapshot) => {
                setUploadedFiles(state => [...state, snapshot._delegate.metadata.name]);
            });
        }
    }

    useEffect(() => {
        if(uploadedFiles.length === inputFiles.length && uploadedFiles.length !== 0) {
            setModalMessage({title: `${uploadedFiles.length} File(s) Uploaded`, body: uploadedFiles.toString()});
        }
    }, [uploadedFiles]);

    useEffect(() => {
        if(modalMessage.title !== "" && modalMessage.body !== "") {
            setShowModal(true);
            removeModal();
        }
    }, [modalMessage]);

    const removeModal = () => setTimeout(() => setShowModal(false), 2000);

    const getFileHandler = () => {
        getFiles(props.clientIp).then(data => {
            const fileNames = data.items.map(item => item.name);
            setCloudFiles(fileNames);
        });
    }

    useEffect(() => getFileHandler(), [uploadedFiles]);


    return <main className={"bg-gradient-to-r from-purple-700 to-blue-300 bg-cover h-screen"}>
        <Head>
            <title>Next-Share</title>
            <meta name={"description"} content={"Cloud-Local Network File Sharing"}/>
            <meta name={"author"} content={"Express Gradient"}/>
        </Head>

        <Header title={"Next-Share"} subTitle={"Cloud-Local Network File Sharing"}/>
        <h1 className={"text-center text-red-800 text-2xl md:text-3xl my-4"}>Room <br/>{props.clientIp}</h1>
        <UploadButton fileHandler={fileHandler}>Upload Files</UploadButton>
        <FilesList files={cloudFiles} folder={props.clientIp} callback={getFileHandler}/>
        {showModal && <Modal title={modalMessage.title} body={modalMessage.body} />}
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
