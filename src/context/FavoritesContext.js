import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const existingFavorites = await AsyncStorage.getItem("favorites");
        const parsedFavorites = existingFavorites
          ? JSON.parse(existingFavorites)
          : [];
        setFavorites(parsedFavorites);
        setCount(parsedFavorites.length);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  const addFavorite = async (car) => {
    const updatedFavorites = [...favorites, car._id];
    setFavorites(updatedFavorites);
    setCount(updatedFavorites.length);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = async (car) => {
    const updatedFavorites = favorites.filter((id) => id !== car._id);
    setFavorites(updatedFavorites);
    setCount(updatedFavorites.length);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, count, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
