import React from "react";
import Header from "./_components/Header";
import Head from "next/head";
import UploadButton from "./_components/UploadButton";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import { getClientIp } from "request-ip";

const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    return <main className={"bg-gradient-to-r from-purple-700 to-blue-300 bg-cover h-screen"}>
        <Head>
            <title>Next-Share</title>
            <meta name={"description"} content={"Cloud-Local Network File Sharing"}/>
            <meta name={"author"} content={"Express Gradient"}/>
        </Head>
        <Header title={"Next-Share"} subTitle={"Cloud-Local Network File Sharing"}/>
        <h1 className={"text-center text-black text-2xl md:text-3xl my-4"}>Room <br/>{props.clientIp}</h1>
        <UploadButton onClick={() => console.log("File Uploaded...")}>Upload File</UploadButton>
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
