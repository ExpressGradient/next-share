import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import Head from "next/head";
import UploadButton from "./_components/UploadButton";

const Home: React.FC = () => {
    const [clientIP, setClientIP] = useState("");
    useEffect(() => {
        fetch("/api/ip_handler").then((response) => response.text()).then((data) => setClientIP(data));
    }, []);
    return <main className={"bg-gradient-to-r from-purple-700 to-blue-300 bg-cover h-screen"}>
        <Head>
            <title>Next-Share</title>
        </Head>
        <Header title={"Next-Share"} subTitle={"Cloud based local network file sharing"}/>
        <h1 className={"text-center text-black text-2xl md:text-3xl my-4"}>Room <br/>{clientIP}</h1>
        <UploadButton onClick={() => console.log("File Uploaded...")}>Upload File</UploadButton>
    </main>
}

export default Home;
