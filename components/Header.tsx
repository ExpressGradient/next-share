import React from "react";

interface HeaderProps {
    title: string,
    subTitle: string
}

const Header: React.FC<HeaderProps> = (props) => <div className={"text-center py-4 bg-gradient-to-r from-purple-200 to-blue-200 shadow-2xl"}>
    <h1 className={"text-3xl md:text-5xl font-medium text-pink-800"}>{props.title}</h1>
    <h3 className={"text-lg md:text-xl font-medium text-red-600 py-2"}>{props.subTitle}</h3>
</div>

export default Header;
