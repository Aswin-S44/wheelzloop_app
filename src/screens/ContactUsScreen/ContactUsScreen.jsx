import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { BACKEND_URL } from "../../constants/url";
import { Ionicons } from "@expo/vector-icons";

const ContactScreen = () => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !feedback.trim()) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (feedback.length > 150) {
      setError("Feedback should not exceed 150 characters.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        await axios.post(`${BACKEND_URL}/api/v1/customer/feedback/send`, {
          name,
          email,
          feedback,
        });
        setLoading(false);
        showMessage({
          message: "Thank You!",
          description: "Your feedback has been submitted successfully.",
          type: "success",
        });
        setName("");
        setEmail("");
        setFeedback("");
      } catch (error) {
        setLoading(false);
        showMessage({
          message: "Error",
          description: "Something went wrong. Please try again later.",
          type: "danger",
        });
      }
    }
  };

  return (
    <LinearGradient colors={["#F76C6C", "#FAD06C"]} style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.overlayText}>Please Wait...</Text>
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.header}>We’d Love To Hear From You</Text>
        <Text style={styles.subHeader}>
          Drop your thoughts or feedback and help us improve
        </Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.textareaContainer}>
          <Ionicons name="chatbox-outline" size={20} color="#999" />
          <TextInput
            style={styles.textarea}
            placeholder="Your Feedback"
            value={feedback}
            onChangeText={setFeedback}
            maxLength={150}
            multiline
          />
        </View>
        <Text style={styles.charCount}>{feedback.length}/150</Text>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Send Feedback</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    marginLeft: 10,
  },
  textareaContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 100,
  },
  textarea: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: "top",
    marginLeft: 10,
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#999",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#F76C6C",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ddd",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
  },
});

export default ContactScreen;
