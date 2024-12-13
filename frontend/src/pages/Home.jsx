import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Input } from "../components/Input";
import { Text } from "../components/Text";
import { InnerContainer, MainContainer } from "../style/GlobalStylComponents";

export const Home = () => {
  const [screamList, setScreamList] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    console.log("User in Home:", user); // Debug log
    if (!user) {
      console.log("Redirecting to SignIn...");
      navigate("/signin");
    }
  }, [user, navigate]);

  const fetchScreams = async () => {
    try {
      const response = await fetch("http://localhost:8080/screams", {
        headers: {
          Authorization: user.accessToken, // Pass the accessToken
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch screams");
      }
      const data = await response.json();
      console.log("Fetched screams:", data); // Debug log
      setScreamList(data);
    } catch (error) {
      console.error("Error fetching screams:", error.message);
    }
  };

  // Fetch screams if user is logged in
  useEffect(() => {
    if (user) {
      fetchScreams();
    } else {
      console.log("User is not authenticated. Redirecting...");
      navigate("/signin"); // Redirect to login if not authenticated
    }
  }, [user]);
  return (
    <MainContainer>
      <InnerContainer>
        {screamList.map((scream, index) => (
          <Text key={index} text={scream.text} index={index} />
        ))}
      </InnerContainer>
      <Input onScreamPosted={fetchScreams} />
    </MainContainer>
  );
};
