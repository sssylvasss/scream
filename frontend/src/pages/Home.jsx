import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Input } from "../components/Input";
import { Text } from "../components/Text";
import { InnerContainer, MainContainer, ModalBtn, ModalText } from "../style/GlobalStylComponents";
import { FalafelMenu } from "../components/FalafelMenu";
import { Modal } from "../components/Modal";
import { Loader } from "../components/loader";

const API_URL = import.meta.env.VITE_API_URL;

export const Home = () => {
  const [screamList, setScreamList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  // Fetch initial screams
  const fetchScreams = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/screams`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`, // Corrected Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch screams");
      }
      const data = await response.json();
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
    }
  }, [user]);

  // Socket.IO for real-time updates
  useEffect(() => {
    if (user) {
      const socket = io(API_URL, {
        auth: {
          token: user.accessToken, // Corrected Socket.IO connection
        },
      });

      socket.on("broadcast-scream", (newScream) => {
        setScreamList((prevScreams) => [newScream, ...prevScreams]);
      });

      return () => {
        socket.disconnect(); // Cleanup on unmount
      };
    }
  }, [user]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <MainContainer>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FalafelMenu openModal={openModal} />
          <InnerContainer>
            {screamList.map((scream, index) => (
              <Text key={index} text={scream.text} index={index} totalCount={screamList.length} />
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