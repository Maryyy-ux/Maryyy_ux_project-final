import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            axios
                .get("http://localhost:8080/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setProfile(response.data);
                })
                .catch((error) => {
                    console.error("Error loading profile:", error);
                });
        }
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Age: {profile.age}</p>
            {profile.profileImage && (
                <img src={`http://localhost:8080${profile.profileImage}`} alt="Perfil" />
            )}
        </div>
    );
};

export default Profile;
