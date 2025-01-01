import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account () {
    const navigate = useNavigate();

    useEffect(() => {
        if (true) {
            navigate("/auth/sign-in");
            return;
        }
    }, [])

    return (
        <div>

        </div>
    )
}