import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Input } from "../components/Input";
import { Text } from "../components/Text";
import { InnerContainer, MainContainer, ModalBtn, ModalText } from "../style/GlobalStylComponents";
import { FalafelMenu } from "../components/FalafelMenu";
import { Modal } from "../components/Modal";
import { Loader } from "../components/loader";

export const Home = () => {
  const [screamList, setScreamList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();


  useEffect(() => {
    console.log("User in Home:", user);
    if (!user) {
      console.log("Redirecting to SignIn...");
      navigate("/signin");
    }
  }, [user, navigate]);

  const fetchScreams = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/screams", {
        headers: {
          Authorization: user.accessToken,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch screams");
      }
      const data = await response.json();
      console.log("Fetched screams:", data);
      setScreamList(data);

    } catch (error) {
      console.error("Error fetching screams:", error.message);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    if (user) {
      fetchScreams();
    } else {
      console.log("User is not authenticated. Redirecting...");
      navigate("/signin"); 
    }
  }, [user]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout(); // Use logout function from AuthProvider
    navigate("/signin");
  };
  return (
    <MainContainer>
{loading ? ( 
      <Loader />) : (
      <>
        <FalafelMenu openModal={openModal}/>
        <InnerContainer>
          {screamList.map((scream, index) => (
            <Text key={index} text={scream.text} index={index} />
          ))}
        </InnerContainer>
        <Input onScreamPosted={fetchScreams} />
      </>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ModalText>Are you done screaming?</ModalText>
          <ModalBtn onClick={handleLogout}>Logout</ModalBtn>
          <ModalBtn onClick={closeModal}>Cancel</ModalBtn>
        </Modal>
      )}
    </MainContainer>
  );
};
